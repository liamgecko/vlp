import Hero from "@/components/Hero";

export default function SuppliersPage() {
  return (
    <div>
      <Hero
        heading="Recommended Suppliers"
        subtitle="Coming Soon"
        primaryButton={{
          text: "Get in touch",
          link: "/contact#book-consultation",
          ariaLabel: "Get in touch about suppliers"
        }}
        showSecondaryButton={false}
        backgroundImage={{ src: "/vlp-01.jpg", alt: "Recommended Suppliers" }}
      />
    </div>
  );
}
