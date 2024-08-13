"use client";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";

interface CustomStatusSelectProps {
  form: any;
  name: string;
  label: string;
  options: { _id: string; status: string }[];
  onChange?: (value: string) => void;
}

const CustomStatusSelect = ({
  form,
  name,
  label,
  options,
  onChange,
}: CustomStatusSelectProps) => {
  return (
    <FormField
      control={form.control}
      name={name}
      render={({ field }) => {
        const handleChange = (value: string) => {
          field.onChange(value);
          if (onChange) onChange(value);
        };

        return (
          <FormItem>
            <FormLabel>{label}</FormLabel>
            <Select
              onValueChange={handleChange}
              defaultValue={field.value}
              value={field.value}
            >
              <FormControl>
                <SelectTrigger>
                  <SelectValue placeholder="Select Status" />
                </SelectTrigger>
              </FormControl>
              <SelectContent>
                {options.map((option) => (
                  <SelectItem key={option._id} value={option.status}>
                    {option.status}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <FormMessage />
          </FormItem>
        );
      }}
    />
  );
};

export default CustomStatusSelect;
