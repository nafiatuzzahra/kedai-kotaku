import MenuCard from "./MenuCard";

function MenuGrid({ data, onSelect }) {
  return (
    <div className="grid md:grid-cols-3 lg:grid-cols-4 gap-6">
      {data.map((item) => (
        <MenuCard key={item.id} item={item} onClick={onSelect} />
      ))}
    </div>
  );
}

export default MenuGrid;
