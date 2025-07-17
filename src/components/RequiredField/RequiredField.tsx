const RequiredField = ({ required = false }: { required?: boolean }) => {
  return required ? <span className="text-red-500"> *</span> : null;
};

export default RequiredField;
