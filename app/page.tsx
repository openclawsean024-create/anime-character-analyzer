import { Suspense } from "react";
import HomeContent from "./HomeContent";

export default function Page() {
  return (
    <Suspense fallback={<div className="page" style={{ minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center" }}><p style={{ color: "#9CA3AF" }}>Loading...</p></div>}>
      <HomeContent />
    </Suspense>
  );
}
