const Input = ({ label, name, formik, type = "text" }) => {
    return (
      <div className="formControl">
        <label>{label}</label>
        <input type={type} {...formik.getFieldProps(name)} name={name} />
        {formik.errors[name] && formik.touched[name] && (
          <div className="error">{formik.errors[name]}</div>
        )}
      </div>
    );
  };
  
  export default Input;