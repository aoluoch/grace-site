function Separator() {
  return (
    <div className="relative h-5 w-full bg-[#efeff2]" aria-hidden="true">
      <div className="absolute inset-x-0 top-0 h-4 bg-[#eee5c9]" />
      <div className="absolute inset-x-0 top-4 h-1 bg-[#f4edda]" />
    </div>
  );
}

export default Separator;