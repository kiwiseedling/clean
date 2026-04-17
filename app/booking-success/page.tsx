type BookingSuccessPageProps = {
  searchParams: Promise<{ session_id?: string }>;
};

export default async function BookingSuccessPage({
  searchParams,
}: BookingSuccessPageProps) {
  const params = await searchParams;
  const sessionId = params.session_id;

  return (
    <div style={{ padding: "40px", textAlign: "center" }}>
      <h1>Booking Confirmed ✅</h1>
      <p>Your card has been securely saved.</p>
      <p>We’ve received your booking request and will follow up shortly.</p>

      {sessionId ? (
        <p style={{ fontSize: "12px", color: "#666" }}>
          Confirmation ID: {sessionId}
        </p>
      ) : null}

      <a href="/" style={{ color: "blue", display: "inline-block", marginTop: "20px" }}>
        Return Home
      </a>
    </div>
  );
}