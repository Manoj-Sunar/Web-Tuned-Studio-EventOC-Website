import { memo } from "react";

import { Eye, EyeOff } from "lucide-react";
import { LoginInputProps } from "@/types/types";
import InputTextField from "./InputTextField";


const LoginInput: React.FC<LoginInputProps> = memo(
  ({ id, label, placeholder, type = "text", value, onChange, icon, togglePassword, isPasswordVisible }) => (
    <div className="flex flex-col gap-1.5">
      <label htmlFor={id} className="font-medium">{label}</label>
      <div className="relative">
        <span className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400">{icon}</span>
        <InputTextField
          type={type}
          name={id}
          InputValue={value}
          setValue={onChange}
          placeholder={placeholder}
          error={""}
          className="pl-12"
        />
        {togglePassword && (
          <button
            type="button"
            onClick={togglePassword}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 dark:hover:text-slate-300"
          >
            {isPasswordVisible ? <EyeOff /> : <Eye />}
          </button>
        )}
      </div>
    </div>
  )
);

LoginInput.displayName = "LoginInput";
export default LoginInput;
