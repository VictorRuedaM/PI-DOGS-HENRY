import React from "react";
import {useState, useEffect} from 'react';
import {Link, useNavigate} from 'react-router-dom';
import {createDogDB, getDogsTemperaments} from '../../actions/index.actions';
import {useSelector, useDispatch} from 'react-redux';
import s from './CreateDog.module.css';


// Funcion para validar lo ingresado a los inputs del form que guarda en el estado errors como un objete si no cumple lo requirido, el error del cada input
// para luego ser renderizado, adicinalmente si en el estado error hay elementos no permitira el envio del form.
function validateInputs(inputs){
    let errorsInputs = {};

    if(inputs.hmin < 0 || inputs.hmin > 50){
        errorsInputs.hmin = '** Require field, please write a valid number between 1 and 50 **'
    }
    if(inputs.hmax < 0 || inputs.hmax > 100){
        errorsInputs.hmax = '** Require field, please write a valid number between 1 and 100 **'
    }
    
    
    

    if(inputs.wmin < 0 || inputs.wmin > 60){
        errorsInputs.wmin = '** Require field, please write a valid number between 1 and 60 **'
    }
    if(inputs.wmax < 0 || inputs.wmax > 100){
        errorsInputs.wmax = '** Require field, please write a valid number between 1 and 100 **'
        
    }
    

    if(inputs.lmin < 0 || inputs.lmin > 8){
        errorsInputs.lmin = '** Require field, please write a valid number between 1 and 8 **'
    }
    if(inputs.lmax < 0 || inputs.lmax > 25){
        errorsInputs.lmax = '** Require field, please write a valid number between 1 and 25 **'
    }


    return errorsInputs;
}


// Funcion validateFormDog cumple la misma funcion de validateInputs solo que en le resto del form, esto es el input name.
function validateFormDog(formDog){

    let errors = {}; 

    if(!formDog.name) {
        errors.name = '** Name is required **'
      } else if (parseInt(formDog.name)) {
        errors.name = '** Name is invalid, please write a text **'
      }

    

    return errors;
}



// Funcion CreateDog renderiza el form.
export function CreateDog(){
    const dispatch = useDispatch();
    const navigate = useNavigate();

    // Se ejecuta en el useEffect la action getDogsTemperaments para obtener los temperamentos.
    useEffect(() => {
        dispatch(getDogsTemperaments());
    }, []);

    // Se traen los temperamentos del state.dogsTemperaments
    const allTemperaments = useSelector((state) => state.dogsTemperaments);

    // State local errors de los inputs
    const [errors, setErrors] = useState({});
    // State local dogErr del resto del form
    const [dogErr, setDogErr] = useState({});
    // const [errorForm, setErrorForm] = useState('')


    // Estado local para todos los imputs del form que luego sera enviado a la ruta post.
    const [formDog, SetFormDog] = useState({

        name: '',
        height: '',
        weight: '',
        life_span: '',
        image: '',
        temperament: []
    });

    // Estado local de los inputs weght, height y life_span que recoje la data de estos campos y los envia al state formDog.
    const [inputs, SetInputs] = useState({
        hmin: 0,
        hmax: 0,
        wmin: 0,
        wmax: 0,
        lmin: 0,
        lmax: 0,
    })

    // Funcion handleInputs que guarda el valor de los inputs weght, height y life_span en el estado local inpusts.
    function handleInputs(e){
        
        SetInputs({
            ...inputs,
            [e.target.name]: e.target.value
        });

        // Se setea el estado errors con lo que devuelve la funcion validtateInputs pasadole el valor de cada input.
        setErrors(validateInputs({
            ...inputs,
            [e.target.name]: e.target.value
        }))
        
        // console.log(inputs)
        
    }


    // Funcion handleFormDog que guarda el valor del input name en el estado local formDog.
    function handleFormDog(e){

        
        SetFormDog({
            ...formDog,
            [e.target.name]: e.target.value
            
        });
        
        // Se setea el estado dogErr con lo que devuelve la funcion validtateFormDog pasadole el valor delinput name.
        setDogErr(validateFormDog({
            ...formDog,
            [e.target.name]: e.target.value
        }))
          
        
        
        
    }


    // Funcion handleSelect que guarda el valor del select de temperamento en el estado local formDog.
    function handleSelect(e){

        // Adicinalmente se gurada en el estado local formDog lo que esta guardado en el estado local inputs
        // el height, weight, life_span como cadena de texto. uniendo los valores min y max.
        SetFormDog({
            ...formDog,
            temperament: [...formDog.temperament, e.target.value],
            'height':`${inputs.hmin} - ${inputs.hmax}`,
            'weight':`${inputs.wmin} - ${inputs.wmax}`,
            'life_span':`${inputs.lmin} - ${inputs.lmax} years`,
        });
       
    }


    // Funcion removeTem elemina un temperamento del array de tempeamentos del formDog cuando el usuario pulsa en boton en el front.
    function removeTem(t){
       
        SetFormDog({
            ...formDog,
            temperament: [...formDog.temperament.filter(e => e !== t)]
        });
        

    }


    // Funcion hadleSubmit que envia el estado formDog a la ruta post
    function handleSubmit(e){

        e.preventDefault();
        
        // Se comprueva si hay errores en los dos estados de error y de ser asi se lanza un alert con la 
        // advertencia para que el usuario verifiquie la informacion de los inputs y no se deja enviar el form.
        if(Object.keys(dogErr).length || Object.keys(errors).length || formDog.name === ''){

            alert('¡¡¡Verify that the fields are not empty or with incorrect parameters to create the race!!!')
            
        }else{
            // Si todo esta bien se envia lo que esta en el estado formDog a la action createDogDB
            // y se lanza un alert para informar que se creo la raza con exito.
            let a = dispatch(createDogDB(formDog)); 
            alert('Breed created successfully!!!')
            // console.log(a)

            // Se resetean los estados locales 
            SetInputs({
                hmin: 0,
                hmax: 0,
                wmin: 0,
                wmax: 0,
                lmin: 0,
                lmax: 0,
            });
            SetFormDog({
                name: '',
                height: '',
                weight: '',
                life_span: '',
                image: '',
                temperament: []
            });
            
            // Se redirecciona a home
            navigate('/home')
        }
        

        // console.log(Object.keys(dogErr).length, Object.keys(errors).length)
        
       
    }

    return(

        // Se renderiza en form.
        <div >
            <Link to={'/home'}><button className={s.buttonGoBack}>Go back to Home</button></Link>

            <h1 className={s.title}>Create Dog Breed</h1>

                <div className={s.container}>
                    <form onSubmit={(e) => handleSubmit(e)}>

                        <div>
                            <label className={s.labels}>Name: </label>
                            <input type="text" name="name"  value={formDog.name} onChange={handleFormDog} className={s.inputs}/>
                            {dogErr.name && (<p className={s.warnings}>{dogErr.name}</p>)}
                        </div>

                        <div>
                            <label className={s.labels}>Min height: </label>
                            <input type="number" name="hmin"  value={inputs.hmin} onChange={handleInputs} className={s.inputs}/>
                            {errors.hmin && (<p className={s.warnings}>{errors.hmin}</p>)}
                        </div>

                        <div>
                            <label className={s.labels}>Max height: </label>
                            <input type="number" name="hmax" min={inputs.hmin} value={inputs.hmax} onChange={handleInputs} className={s.inputs}/>
                            {errors.hmax && (<p className={s.warnings}>{errors.hmax}</p>)}
                        </div>

                        <div>
                            <label className={s.labels}>Min weight: </label>
                            <input type="number" name="wmin"  value={inputs.wmin} onChange={handleInputs} className={s.inputs}/>
                            {errors.wmin && (<p className={s.warnings}>{errors.wmin}</p>)}
                        </div>

                        <div>
                            <label className={s.labels}>Max weight: </label>
                            <input type="number" name="wmax" min={inputs.wmin} value={inputs.wmax} onChange={handleInputs} className={s.inputs}/>
                            {errors.wmax && (<p className={s.warnings}>{errors.wmax}</p>)}
                        </div>

                        <div>
                            <label className={s.labels}>Min life years: </label>
                            <input type="number" name="lmin" value={inputs.lmin} onChange={handleInputs} className={s.inputs}/>
                            {errors.lmin && (<p className={s.warnings}>{errors.lmin}</p>)}
                        </div>

                        <div>
                            <label className={s.labels}>Max life years: </label>
                            <input type="number" name="lmax" min={inputs.lmin} value={inputs.lmax} onChange={handleInputs} className={s.inputs}/>
                            {errors.lmax && (<p className={s.warnings}>{errors.lmax}</p>)}
                        </div>

                        <div>
                            <label className={s.labels}>Image: </label>
                            <input type="text" name="image" value={formDog.image} onChange={handleFormDog} className={s.inputs}/>
                        </div>

                        <div className={s.selectOptions}>
                            <select className={s.selectOptions} onChange={handleSelect}>
                                <option value={'select'}>Select Temperament</option>
                                {
                                    allTemperaments && allTemperaments.map(e => 
                                        
                                        <option value={e.name} key={e.id}>{e.name}</option>
                                        )
                                }
                            </select>
                        </div>
                        

                       <div>
                            <button type="submit" className={s.buttonCreate} >Create Dog</button>
                            
                            <Link to={'/home'}><button className={s.buttonCancel}>Cancel</button></Link>
                       </div>

                       
                        {/* <p className={s.warnings}>{errorForm}</p> */}
                    </form>
                    
                    
                </div>
                <div className={s.box}>
                            <ul className={s.listItems}>
                                {
                                    formDog.temperament.map(t => 
                                        
                                        <li className={s.item} key={t}>{t} 
                                        <button className={s.buttonRemoveTem} onClick={() => removeTem(t)}>X</button>
                                        </li>
                                    )
                                }

                            </ul>
                </div>            
            <div>
                
                    
                    
            </div>



        </div>
    )

}

