function SectionTitle({ title, subtitle }) {
  return (
    <div className="text-center mb-14">
      <h2 className="text-4xl font-bold text-gray-800">{title}</h2>

      <p className="text-gray-500 mt-3">{subtitle}</p>
    </div>
  );
}

export default SectionTitle;
