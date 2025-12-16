import Title from "./title";
import Typography from "./typography";

export default function SupportSection() {
  return (
    <section className="px-6 py-20 bg-teal-50">
      <div className="max-w-2xl mx-auto text-center space-y-8">
        <div className="space-y-3">
          <Title level="h2" className="text-gray-900">
            Soutenir notre association
          </Title>
          <Typography variant="body-lg" className="text-gray-600">
            Vos dons nous permettent de développer nos activités et
            d&apos;accueillir tous les niveaux
          </Typography>
        </div>
        <button className="cursor-pointer px-8 py-3 bg-teal-600 text-white rounded-lg font-semibold hover:bg-teal-700 transition duration-200">
          Faire un don
        </button>
      </div>
    </section>
  );
}
