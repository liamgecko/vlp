import Hero from "@/components/Hero";

export default function SuppliersPage() {
  return (
    <div>
      <Hero
        title="Recommended Suppliers"
        subtitle="Coming Soon"
        description="We're working on curating a list of trusted suppliers to help make your wedding planning even easier."
        primaryButton={{
          text: "Get in touch",
          link: "/contact#book-consultation",
          ariaLabel: "Get in touch about suppliers"
        }}
        showSecondaryButton={false}
        backgroundImage="/vlp-01.jpg"
      />
    </div>
  );
}
