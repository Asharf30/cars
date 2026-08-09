
interface CustomFilterProps {
  title: string;
}

const CustomFilter = ({ title }: CustomFilterProps) => {
  return (
    <div>CustomFilter: {title}</div>
  );
};

export default CustomFilter;