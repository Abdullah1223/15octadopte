import Homepage from "../../app/Homepage";

export default function PreviewPage({ searchParams }) {
  const { data, position } = searchParams;

  let adData = {};
  try {
    adData = JSON.parse(decodeURIComponent(data));
  } catch (e) {
    console.error("Invalid ad data");
  }

  return (
    <div className="max-w-[1440px] mx-auto border rounded shadow overflow-hidden">
      <Homepage topBanner={adData} position={position || "top"} />
    </div>
  );
}
