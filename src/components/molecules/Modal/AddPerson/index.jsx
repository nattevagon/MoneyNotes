import { useForm, FormProvider } from "react-hook-form";
import { useEffect, useState } from "react"
import { getStorage, saveStorage } from "@/helper/localStorage";
import FormInput from "@/components/molecules/Form/FormInput";

const AddPerson = ({ data : dataProps, onConfirm, onClose }) => {
  const [visible, setVisible] = useState(false);
  const addPerson = useForm();

  useEffect(() => {
    const t = setTimeout(() => setVisible(true), 10)
    return () => clearTimeout(t)
  }, [])

  const handleClose = () => {
    setVisible(false)
    setTimeout(onClose, 300)
  }

  const onSubmitPeople = (data) => {
      console.log(data);
      const oldData = getStorage("peoples");
  
      const newData = {
        id: Date.now(),
        username: data?.peopleName.toLowerCase().replace(/\s/g, ""),
        name: data?.peopleName,
        role: dataProps?.type
      };
  
      const updated = [...oldData, newData];
      saveStorage("peoples", updated);
      addPerson.reset();
      onConfirm();
    };

  return (
    <div className="fixed inset-0 z-50 flex items-end justify-center">
      <div
        onClick={handleClose}
        className={`absolute inset-0 bg-black transition-opacity duration-300
        ${visible ? "opacity-50" : "opacity-0"}`}
      />
      <div
        className={`relative w-full bg-[#141414] border-t-1 border-[#3d3d40] rounded-t-2xl px-6 pt-6 pb-10 transform transition-all duration-300
        ${visible ? "translate-y-0" : "translate-y-60"}`}
      >
        <h3 className="font-bold text-lg mb-4">Add {dataProps?.type === "admin" ? 'Admin' : 'Person'}</h3>
        <div>
          <FormProvider {...addPerson}>
            <form
              onSubmit={addPerson.handleSubmit(onSubmitPeople)}
              className="space-y-4"
            >
              <FormInput
                name="peopleName"
                label="Name"
                type="text"
                placeholder="Place a name"
              />
              <button className="btn bg-linear-to-r from-[#090040] to-[#065084] text-white w-full mt-4 rounded-lg border border-1 border-[#3d3d40]" type="submit">
                Save
              </button>
            </form>
          </FormProvider>
        </div>
      </div>
    </div>
  )
}

export default AddPerson