"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

type BookingDraft = {
  bookingId?: string;
  paymentLinkId?: string | null;
  orderId?: string | null;
  squareBookingId?: string | null;
  serviceId: string;
  addonIds: string[];
  date: string;
  time: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  notes: string;
  totalDollars: number;
  depositDollars: number;
  serviceName: string;
  addonNames: string[];
};

export default function BookingSuccessPage() {
  const [mounted, setMounted] = useState(false);
  const [draft, setDraft] = useState<BookingDraft | null>(null);

  useEffect(() => {
    setMounted(true);
    try {
      const raw = sessionStorage.getItem("bookingDraft");
      if (!raw) return;
      const parsed = JSON.parse(raw) as BookingDraft;
      setDraft(parsed);
    } catch {
      // ignore
    }
  }, []);

  const [appointmentStatus, setAppointmentStatus] = useState<
    "idle" | "creating" | "created" | "error"
  >("idle");
  const [squareBookingId, setSquareBookingId] = useState<string | null>(null);
  const [appointmentError, setAppointmentError] = useState<string>("");

  useEffect(() => {
    if (!draft?.squareBookingId) return;
    setSquareBookingId(draft.squareBookingId);
    setAppointmentStatus("created");
  }, [draft?.squareBookingId]);

  useEffect(() => {
    if (!mounted) return;
    if (!draft) return;
    if (draft.squareBookingId) return;
    if (appointmentStatus !== "idle") return;

    let cancelled = false;

    const run = async () => {
      setAppointmentError("");
      setAppointmentStatus("creating");

      try {
        const response = await fetch("/api/square/appointments/create", {
          method: "POST",
          headers: {
            "content-type": "application/json",
          },
          body: JSON.stringify({
            bookingId: draft.bookingId,
            serviceId: draft.serviceId,
            addonIds: draft.addonIds,
            date: draft.date,
            time: draft.time,
            firstName: draft.firstName,
            lastName: draft.lastName,
            email: draft.email,
            phone: draft.phone,
            notes: draft.notes,
          }),
        });

        const data = (await response.json()) as
          | { ok: true; squareBookingId: string | null }
          | { ok: false; error: string };

        if (!response.ok || !data.ok) {
          throw new Error((data as { ok: false; error: string }).error || "Failed to create appointment");
        }

        if (cancelled) return;

        const createdId = (data as { ok: true; squareBookingId: string | null }).squareBookingId;
        setSquareBookingId(createdId);
        setAppointmentStatus("created");

        try {
          const raw = sessionStorage.getItem("bookingDraft");
          if (!raw) return;
          const current = JSON.parse(raw) as BookingDraft;
          sessionStorage.setItem(
            "bookingDraft",
            JSON.stringify({
              ...current,
              squareBookingId: createdId,
            }),
          );
        } catch {
          // ignore
        }
      } catch (err) {
        if (cancelled) return;
        const message = err instanceof Error ? err.message : "Failed to create appointment";
        setAppointmentError(message);
        setAppointmentStatus("error");
      }
    };

    void run();

    return () => {
      cancelled = true;
    };
  }, [appointmentStatus, draft, mounted]);

  const dateText = (() => {
    if (!draft?.date) return "";
    const parsed = new Date(draft.date);
    if (Number.isNaN(parsed.getTime())) return draft.date;
    return parsed.toLocaleDateString("en-AU", {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  })();

  return (
    <main className="antialiased bg-silk-cream min-h-screen">
      <section className="relative py-16 md:py-24 bg-warm-white">
        <div className="container max-w-3xl mx-auto px-6">
          <div className="bg-silk-cream border border-stone-800/12 p-8 md:p-10 text-center space-y-5">
            <h1 className="text-xl md:text-2xl font-light uppercase tracking-[0.12em] text-sumi-ink">
              Deposit Received
            </h1>
            <p className="text-sm text-stone-grey leading-relaxed">
              Thank you — your 20% deposit has been received. We&apos;ll confirm your appointment via email or SMS.
            </p>

            {draft && (
              <div className="bg-warm-white border border-stone-800/12 p-6 text-left space-y-3">
                <div className="flex justify-between text-xs">
                  <span className="text-stone-grey">Treatment:</span>
                  <span className="text-sumi-ink">{draft.serviceName}</span>
                </div>
                {draft.addonNames.length > 0 && (
                  <div className="flex justify-between text-xs">
                    <span className="text-stone-grey">Add-ons:</span>
                    <span className="text-sumi-ink">{draft.addonNames.join(", ")}</span>
                  </div>
                )}
                <div className="flex justify-between text-xs">
                  <span className="text-stone-grey">Requested:</span>
                  <span className="text-sumi-ink">{dateText} at {draft.time}</span>
                </div>
                <div className="flex justify-between text-xs pt-3 border-t border-stone-800/12">
                  <span className="text-stone-grey uppercase tracking-wider">Deposit:</span>
                  <span className="text-sumi-ink">${draft.depositDollars}</span>
                </div>

                {draft.bookingId && (
                  <div className="flex justify-between text-[11px] pt-3 border-t border-stone-800/12">
                    <span className="text-stone-grey uppercase tracking-wider">Booking ID:</span>
                    <span className="text-sumi-ink">{draft.bookingId}</span>
                  </div>
                )}

                <div className="flex justify-between text-[11px] pt-3 border-t border-stone-800/12">
                  <span className="text-stone-grey uppercase tracking-wider">Appointment:</span>
                  <span className="text-sumi-ink">
                    {appointmentStatus === "creating" && "Creating…"}
                    {appointmentStatus === "created" && (squareBookingId ? `Created (${squareBookingId})` : "Created")}
                    {appointmentStatus === "error" && "Not created"}
                    {appointmentStatus === "idle" && "Pending"}
                  </span>
                </div>

                {appointmentError && (
                  <p className="text-[11px] text-stone-grey pt-2">{appointmentError}</p>
                )}
              </div>
            )}

            <div className="pt-2">
              <Link
                href="/booking"
                className="inline-flex items-center gap-2 px-6 py-3 border border-stone-800/20 text-stone-grey text-xs uppercase tracking-widest hover:border-stone hover:text-stone transition-all duration-300"
              >
                Back to Booking
              </Link>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
