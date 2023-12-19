interface TextInputProps {
  id: string;
  name?: string;
  className?: string;
  value?: string;
  onChange?: any;
  onBlur?: any;
  placeHolder?: string;
  autoComplete?: string;
  type?: string;
}
// export const ReactTable = ({ data, columns, globalSearch, showPagination, isLoading, error }: TableProps) => {
export const TextInput = ( {id, className, value, onChange, onBlur, placeHolder, autoComplete = "off", type = "text"}: TextInputProps) => {
  return (
    <input
        id={id}
        className={ `border border-gray-300 rounded px-2 py-1 ${className}` }
        value={value}
        onChange={ onChange }
        placeholder={placeHolder}
        autoComplete={autoComplete}
        type={type}
        onBlur={onBlur}
      />
  );
}