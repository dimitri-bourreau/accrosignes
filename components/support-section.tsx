export default function SupportSection() {
  return (
    <section className="px-6 py-20 bg-teal-50">
      <div className="max-w-2xl mx-auto text-center space-y-8">
        <div className="space-y-3">
          <h2 className="text-4xl font-bold text-gray-900">
            Soutenir notre association
          </h2>
          <p className="text-lg text-gray-600">
            Vos dons nous permettent de développer nos activités et d&apos;accueillir
            tous les niveaux
          </p>
        </div>
        <button className="cursor-pointer px-8 py-3 bg-teal-600 text-white rounded-lg font-semibold hover:bg-teal-700 transition duration-200">
          Faire un don
        </button>
      </div>
    </section>
  );
}
