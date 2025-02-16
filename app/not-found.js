export const metadata = {
  title: "404 - Page Not Found",
};

export default function NotFound() {
  return (
    <main
      style={{
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <h1
        style={{
          fontSize: "2rem",
          fontWeight: "bold",
          marginBottom: "1rem",
        }}
      >
        404 - Page Not Found
      </h1>
      <p
        style={{
          color: "#666",
        }}
      >
        The page you are looking for does not exist.
      </p>
    </main>
  );
}
