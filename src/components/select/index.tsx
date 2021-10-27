import Select from 'react-select';

type props = {
  options: any;
  name: string;
  value: any;
  onChange: any;
};

const customStyles = {
  // option: (provided: any, state: any) => ({
  option: (provided: any) => ({
    ...provided,
    // borderBottom: '1px dotted pink',
    // color: state.isSelected ? 'red' : 'blue',
    padding: 10,
    fontSize: 15,
  }),
  // control: () => ({
  //     // none of react-select's styles are passed to <Control />
  //     width: 200,
  // }),
  singleValue: (provided: any, state: any) => {
    const opacity = state.isDisabled ? 0.5 : 1;
    const transition = 'opacity 300ms';

    return { ...provided, opacity, transition };
  },
};

export default function ReactSelect({ value, name, options, onChange }: props) {
  return (
    <Select styles={customStyles} name={name} options={options} value={value} onChange={onChange} />
  );
}
