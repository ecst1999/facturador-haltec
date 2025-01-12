import { Textarea } from "keep-react";
import { UseFacturaStore } from "../../hooks";
import React, { useEffect } from "react";

export const FacturaForm = () => {

  const { rangos_numeracion, getNumeracion } = UseFacturaStore()

  useEffect(() => {
    getNumeracion()

  }, [])

  const onChangeSelect = ({ target }: React.FormEvent<HTMLSelectElement>) => {
    console.log(target.value)
  }

  return <>
    <div className="grid content-center p-5">

      <form className="p-3">
        <div className="p-3">
          <select onChange={onChangeSelect} id="country" name="country" className="col-start-1 row-start-1 w-full appearance-none rounded-md bg-white py-1.5 pl-3 pr-8 text-base text-gray-900 outline outline-1 -outline-offset-1 outline-gray-300 focus:outline focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6">

            <option value="" selected={true}>Seleccione Rango</option>
            {
              rangos_numeracion.map(rg => {
                return (<option value={rg.id} key={rg.id}>{rg.document}</option>)
              })
            }
          </select>

        </div>
        <div className="p-3">

          <Textarea placeholder="Observación de la factura" rows={8} />
        </div>
      </form>
    </div>
  </>
};
