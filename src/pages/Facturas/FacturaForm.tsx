import { Button, Input, Table, TableBody, TableCell, TableHead, TableHeader, TableRow, Textarea } from "keep-react";
import { UseFacturaStore, UseForm } from "../../hooks";
import React, { useEffect, useState } from "react";
import { productos } from "../../data/productos";
import Swal from "sweetalert2";

export const FacturaForm = () => {

  const { 
    //Properties
    rangos_numeracion, 
    municipalidades,
    //Methods
    getNumeracion, 
    getMunicipales,
    emitirFactura, 
  } = UseFacturaStore()

  const [productoData, setProductoData] = useState([])
  const [productoSeleccionado, setproductoSeleccionado] = useState("")
  const [cantidadProducto, setCantidadProducto] = useState<number>(0)  

  const { numbering_range_id,     
    reference_code,
    observation,
    payment_form,
    identificacion,
    nombres,
    direccion,
    email,
    telefono,
    tipo_organizacion,
    tipo_tributo,
    tipo_documento_id,
    municipality_id,
    onInputChange,
    onResetForm,
  } = UseForm({
      numbering_range_id: "",
      reference_code: "ec593",
      observation: "",
      payment_form: "1",      
      identificacion: "",
      nombres: "",
      direccion: "",
      email: "",
      telefono: "",
      tipo_organizacion: "",
      tipo_tributo: "",
      tipo_documento_id: "",
      municipality_id: "",
    });

  useEffect(() => {
    getNumeracion()
    getMunicipales()
  }, [])

  const onSubmit = (event : React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    
    const infoFactura = {
      numbering_range_id,
      reference_code,
      observation,
      payment_form,
      payment_method_code: 10,
      billing_period: {
        start_date: "2024-01-10",
        start_time: "00:00:00",
        end_date: "2024-02-09",
        end_time: "23:59:59"
      },
      customer : {
        identification: identificacion,
        dv: 3,
        company: "",
        trade_name: "",
        names: nombres,
        address: direccion,
        email,
        phone: telefono,
        legal_organization_id: tipo_organizacion,
        tribute_id: tipo_tributo,
        identification_document_id: tipo_documento_id, 
        municipality_id
      },
      items: productoData
    }

    emitirFactura(infoFactura).then(r => {

      Swal.fire({        
        html: `
          <h3>Factura validada</h3>
          <p>Factura valida con número: ${r.data.bill.number}</p> <br />
          <a href='${r.data.bill.public_url}' target='_blank' class='bg-gray-100 dark:bg-gray-700 dark:hover:bg-gray-600 dark:border-gray-600 hover:bg-gray-200 border border-gray-300 rounded-e-lg p-3 h-11 focus:ring-gray-100 dark:focus:ring-gray-700 focus:ring-2 focus:outline-none'>Ver factura</a>
        `,
        icon: 'success',
        showConfirmButton: false
      })
      console.log(r)
    }).catch(e => {
      console.log(e)
    })

    onResetForm()

    setProductoData([])
  }

  const onChangeProduct = ({target}: React.FocusEvent<HTMLSelectElement>) => {        
    if(target.value == "") return

    setproductoSeleccionado(target.value)     
  }

  const onAgregarProducto = () => {                
    const productoInfo = productos.filter(p => productoSeleccionado == p.code_reference)

    const productoNuevo = { ...productoInfo[0], quantity: cantidadProducto }

    setProductoData([...productoData, productoNuevo])
    setproductoSeleccionado("")
    setCantidadProducto(0)

  }

  const onIncrement = () => setCantidadProducto(cantidadProducto + 1)
  

  const onDecrease = () => {
    if(cantidadProducto == 0) return
    setCantidadProducto(cantidadProducto - 1)
  }

  return <>
    <div className="grid content-center p-5">

      <form className="p-3" onSubmit={onSubmit}>
        <div className="p-2">
          <select onChange={onInputChange} id="numbering_range_id" name="numbering_range_id" value={numbering_range_id} className="col-start-1 row-start-1 w-full appearance-none rounded-md bg-white py-1.5 pl-3 pr-8 text-base text-gray-900 outline outline-1 -outline-offset-1 outline-gray-300 focus:outline focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6">

            <option value="" selected={true}>Seleccione Rango</option>
            {
              rangos_numeracion.map(rg => {
                return (<option value={rg.id} key={rg.id}>{rg.document}</option>)
              })
            }
          </select>

        </div>

        <div className="p-2">
          <select onChange={onInputChange} id="tipo_documento_id" name="tipo_documento_id" value={tipo_documento_id} className="col-start-1 row-start-1 w-full appearance-none rounded-md bg-white py-1.5 pl-3 pr-8 text-base text-gray-900 outline outline-1 -outline-offset-1 outline-gray-300 focus:outline focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6">
            <option value="">Seleccione el tipo de documento de identidad del cliente.</option>
            <option value="1">Registro civil</option>
            <option value="2">Tarjeta de identidad</option>
            <option value="3">Cédula de ciudadanía</option>
            <option value="4">Tarjeta de extranjería</option>
            <option value="5">Cédula de extranjería</option>
            <option value="6">NIT</option>
            <option value="7">Pasaporte</option>            
            <option value="8">Documento de identificación extranjero</option>
            <option value="9">PEP</option>
            <option value="10">NIT otro país</option>
            <option value="11">NUIP*</option>
          </select>
        </div>

        <div className="p-2">
          <Textarea onChange={onInputChange} placeholder="Observación de la factura" rows={8} id="observation"  name="observation" value={observation} />
        </div>        

        <div className="p-2">
          <Input type="text" id="identificacion" name="identificacion" value={identificacion} onChange={onInputChange} placeholder="N° Identificación cliente"/>
        </div>

        <div className="p-2">
          <Input type="text" id="nombres" name="nombres" value={nombres} onChange={onInputChange} placeholder="Nombres cliente"/>
        </div>

        <div className="p-2">            
          <Textarea id="direccion" name="direccion" value={direccion} onChange={onInputChange} placeholder="Dirección cliente" rows={4} />
        </div>

        <div className="p-2">
          <Input type="email" id="email" name="email" value={email} onChange={onInputChange} placeholder="Correo electrónico cliente"/>          
        </div>

        <div className="p-2">
          <Input type="text" id="telefono" name="telefono" value={telefono} onChange={onInputChange} placeholder="Teléfono cliente"/>          
        </div>

        <div className="p-2">
          <select id="tipo_organizacion" name="tipo_organizacion" value={tipo_organizacion} onChange={onInputChange} className="col-start-1 row-start-1 w-full appearance-none rounded-md bg-white py-1.5 pl-3 pr-8 text-base text-gray-900 outline outline-1 -outline-offset-1 outline-gray-300 focus:outline focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6">
            <option value="">Seleccione la organización legal del cliente.</option>
            <option value="1">Persona Jurídica</option>
            <option value="2">Persona Natural</option>
          </select>
        </div>

        <div className="p-2">
          <select id="tipo_tributo" name="tipo_tributo" value={tipo_tributo} onChange={onInputChange} className="col-start-1 row-start-1 w-full appearance-none rounded-md bg-white py-1.5 pl-3 pr-8 text-base text-gray-900 outline outline-1 -outline-offset-1 outline-gray-300 focus:outline focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6">
            <option value="">Seleccione el tributo del cliente.</option>
            <option value="18">IVA</option>
            <option value="21">No aplica *</option>
          </select>
        </div>

        <div className="p-2">
          <select onChange={onInputChange} id="municipality_id" name="municipality_id" value={municipality_id} className="col-start-1 row-start-1 w-full appearance-none rounded-md bg-white py-1.5 pl-3 pr-8 text-base text-gray-900 outline outline-1 -outline-offset-1 outline-gray-300 focus:outline focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6">

            <option value="" selected={true}>Seleccione Municipalidad</option>
            {
              municipalidades.map(mp => {
                return (<option value={mp.id} key={mp.id}>{mp.department} - {mp.name} </option>)
              })
            }
          </select>

        </div>

        <hr className="my-6 h-0.5 border-t-0 bg-neutral-100 dark:bg-white/10" />

        <h4 className="p-2">Seleccione producto a facturar</h4>

        <div className="p-2">
          <select name="product" id="producto" onChange={onChangeProduct} className="col-start-1 row-start-1 w-full appearance-none rounded-md bg-white py-1.5 pl-3 pr-8 text-base text-gray-900 outline outline-1 -outline-offset-1 outline-gray-300 focus:outline focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6">
            <option value="">Selecciona el producto</option>
            {
              productos.map(p => {
                return <option value={p.code_reference} key={p.code_reference}>{p.name}</option>
              })
            }
          </select>
          
          <div className="relative flex items-center max-w-[8rem] p-2">
            <button type="button" onClick={onDecrease} className="bg-gray-100 dark:bg-gray-700 dark:hover:bg-gray-600 dark:border-gray-600 hover:bg-gray-200 border border-gray-300 rounded-s-lg p-3 h-11 focus:ring-gray-100 dark:focus:ring-gray-700 focus:ring-2 focus:outline-none">
                  <svg className="w-3 h-3 text-gray-900 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 18 2">
                      <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M1 1h16"/>
                  </svg>
              </button>
              <input value={cantidadProducto} type="text" readOnly id="quantity-input" className="bg-gray-50 border-x-0 border-gray-300 h-11 text-center text-gray-900 text-sm focus:ring-blue-500 focus:border-blue-500 block w-full py-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="9" required />
              <button type="button" onClick={onIncrement}  id="increment-button" className="bg-gray-100 dark:bg-gray-700 dark:hover:bg-gray-600 dark:border-gray-600 hover:bg-gray-200 border border-gray-300 rounded-e-lg p-3 h-11 focus:ring-gray-100 dark:focus:ring-gray-700 focus:ring-2 focus:outline-none">
                  <svg className="w-3 h-3 text-gray-900 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 18 18">
                      <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 1v16M1 9h16"/>
                  </svg>
              </button>
          </div>
        </div>


        <div className="p-2">
          <Button type="button" variant="outline" onClick={onAgregarProducto}>Agregar Producto</Button>
        </div>

        <hr className="my-6 h-0.5 border-t-0 bg-neutral-100 dark:bg-white/10" />

        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>
                <div className="max-w-[250px]">Nombre productos</div>
              </TableHead>
              <TableHead>
                <div className="w-[80px]">Precio</div>
              </TableHead>
              <TableHead>
                <div className="w-[80px]">Cantidad</div>
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            
            {
              productoData.map((res, index) => (
                <TableRow key={index}>
                  <TableCell>
                    <div className="max-w-[250px] truncate">{res.name}</div>
                  </TableCell>
                  <TableCell>{res.price}</TableCell>
                  <TableCell>{res.quantity}</TableCell>
                </TableRow>
              ))
            }
              
            
          </TableBody>
        </Table>
        	
        <div className="p-2">
            <Button type="submit">Emitir Factura</Button>
        </div>

      </form>
    </div>
  </>
}
