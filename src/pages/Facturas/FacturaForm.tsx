import { Button, Input, Textarea } from "keep-react";
import { UseFacturaStore } from "../../hooks";
import React, { useEffect } from "react";

export const FacturaForm = () => {

  const { 
    //Properties
    rangos_numeracion, 
    municipalidades,
    //Methods
    getNumeracion, 
    getMunicipales 
  } = UseFacturaStore()

  useEffect(() => {
    getNumeracion()
    getMunicipales()

  }, [])

  const onChangeSelect = ({ target }: React.FormEvent<HTMLSelectElement>) => {
    console.log(target.value)
    console.log(target.name)
    
  }

  /*
    {
        "numbering_range_id": 4,
        "reference_code": "I3",
        "observation": "",
        "payment_form": "1",
      "payment_due_date": "2024-12-30",
        "payment_method_code": "10",
      "billing_period": {
            "start_date": "2024-01-10",
            "start_time": "00:00:00",
            "end_date": "2024-02-09",
            "end_time": "23:59:59"
        },
        "customer": {
            "identification": "123456789",
            "dv": "3",
            "company": "",
            "trade_name": "",
            "names": "Alan Turing",
            "address": "calle 1 # 2-68",
            "email": "alanturing@enigmasas.com",
            "phone": "1234567890",
            "legal_organization_id": "2",
            "tribute_id": "21",
            "identification_document_id": "3",
            "municipality_id": "980"
        },
        "items": [
            {
                "code_reference": "12345",
                "name": "producto de prueba",
                "quantity": 1,
                "discount_rate": 20,
                "price": 50000,
                "tax_rate": "19.00",
                "unit_measure_id": 70,
                "standard_code_id": 1,
                "is_excluded": 0,
                "tribute_id": 1,
                "withholding_taxes": [
                    {
                        "code": "06",
                        "withholding_tax_rate": "7.00"
                    },
                    {
                        "code": "05",
                        "withholding_tax_rate": "15.00"
                    }
                ]
            },
            {
                "code_reference": "54321",
                "name": "producto de prueba 2",
                "quantity": 1,
                "discount_rate": 0,
                "price": 50000,
                "tax_rate": "5.00",
                "unit_measure_id": 70,
                "standard_code_id": 1,
                "is_excluded": 0,
                "tribute_id": 1,
                "withholding_taxes": []
            }
        ]
    }
  */

  return <>
    <div className="grid content-center p-5">

      <form className="p-3">
        <div className="p-2">
          <select onChange={onChangeSelect} id="rango" name="rango" className="col-start-1 row-start-1 w-full appearance-none rounded-md bg-white py-1.5 pl-3 pr-8 text-base text-gray-900 outline outline-1 -outline-offset-1 outline-gray-300 focus:outline focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6">

            <option value="" selected={true}>Seleccione Rango</option>
            {
              rangos_numeracion.map(rg => {
                return (<option value={rg.id} key={rg.id}>{rg.document}</option>)
              })
            }
          </select>

        </div>

        <div className="p-2">
          <Textarea placeholder="Observación de la factura" rows={8} />
        </div>        

        <div className="p-2">
          <Input type="text" name="identificacion" placeholder="N° Identificación cliente"/>
        </div>

        <div className="p-2">
          <Input type="text" name="nombres" placeholder="Nombres cliente"/>
        </div>

        <div className="p-2">            
          <Textarea name="direccion" placeholder="Dirección cliente" rows={4} />
        </div>

        <div className="p-2">
          <Input type="email" name="correo" placeholder="Correo electrónico cliente"/>          
        </div>

        <div className="p-2">
          <Input type="text" name="telefono" placeholder="Teléfono cliente"/>          
        </div>

        <div className="p-2">
          <select id="organizacion_legal" name="organizacion_legal" className="col-start-1 row-start-1 w-full appearance-none rounded-md bg-white py-1.5 pl-3 pr-8 text-base text-gray-900 outline outline-1 -outline-offset-1 outline-gray-300 focus:outline focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6">
            <option value="">Seleccione la organización legal del cliente.</option>
            <option value="1">Persona Jurídica</option>
            <option value="2">Persona Natural</option>
          </select>
        </div>

        <div className="p-2">
          <select id="tributos_clientes" name="tributos_clientes" className="col-start-1 row-start-1 w-full appearance-none rounded-md bg-white py-1.5 pl-3 pr-8 text-base text-gray-900 outline outline-1 -outline-offset-1 outline-gray-300 focus:outline focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6">
            <option value="">Seleccione el tributo del cliente.</option>
            <option value="18">IVA</option>
            <option value="21">No aplica *</option>
          </select>
        </div>

        <div className="p-2">
          <select onChange={onChangeSelect} id="municipalidad" name="municipalidad" className="col-start-1 row-start-1 w-full appearance-none rounded-md bg-white py-1.5 pl-3 pr-8 text-base text-gray-900 outline outline-1 -outline-offset-1 outline-gray-300 focus:outline focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6">

            <option value="" selected={true}>Seleccione Municipalidad</option>
            {
              municipalidades.map(mp => {
                return (<option value={mp.id} key={mp.id}>{mp.department} - {mp.name} </option>)
              })
            }
          </select>

        </div>
        	
        <div className="p-2">
            <Button type="submit">Enviar Factura</Button>
        </div>

      </form>
    </div>
  </>
};
