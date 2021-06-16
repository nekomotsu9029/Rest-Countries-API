Vue.config.productionTip = false


const app = new Vue({
    data(){
        return{
            selectPaises: {
             disabled: false,
             contenido: ''
            },
            selectEstados: {
                disabled: true,
                contenido: ''
               },
            selectCiudades: {
                disabled: true,
                contenido: ''
               },
            paises: [],
            estados: [],
            ciudades: [],
            paisActivo: {
                id: '',
                name: "" 
            },
            estadoActivo: {
                id: '',
                name: "",
                id_country: ''
            },
            ciudadActiva: {
                id: '', 
                id_state: '', 
                name: ''
            }
        }
    },
    methods:{
        cargarPaises: function(){
            axios.get('../REST countries/countries.json').then(response => {
                this.paises = response.data.countries
                console.log('se cargaron los paises')
            })
        },
        cargarEstados: function(){
            axios.get('../REST countries/states.json').then(response => {
                this.estados = response.data.states.filter(states => states.id_country == this.paisActivo.id)
                console.log('se cargaron los estados')
                //this.cargarCiudades()
            })
            
        },
        cargarCiudades: function(){
            axios.get('../REST countries/cities.json').then(response => {
                this.ciudades = response.data.cities.filter(cities => cities.id_state == this.estadoActivo.id)
                console.log('se cargaron las ciudades')
            })
        },
        actualizarPaisActivo: function(){
            //primero buscamos el item activo
            if(this.selectPaises.contenido!=''){
                let item;
                for(var i=0; i<this.paises.length; i++){
                    if(this.paises[i].name==this.selectPaises.contenido){
                        this.paisActivo.id = this.paises[i].id
                        this.paisActivo.name = this.paises[i].name
                        console.log('el pais activo es: '+this.paisActivo.name)
                        this.selectEstados.disabled = false;
                    }
                }
                
                this.estadoActivo = {
                    id: '',
                    name: "",
                    id_country: ''
                }
                
                this.ciudadActiva = {
                    id: '', 
                    id_state: '', 
                    name: ''
                }
                
                this.selectEstados = {
                    disabled: false,
                    contenido: ''
                   }
                   
               this.selectCiudades = {
                disabled: true,
                contenido: ''
               }
               
                this.cargarEstados()
                
            }
            
        },
        actualizarEstadoActivo: function(){
            //primero buscamos el item activo
            if(this.selectEstados.contenido!=''){
                let item;
                for(var i=0; i<this.estados.length; i++){
                    if(this.estados[i].name==this.selectEstados.contenido){
                        this.estadoActivo.id = this.estados[i].id
                        this.estadoActivo.name = this.estados[i].name
                        this.estadoActivo.id_country = this.estados[i].id_country
                        console.log('el estado activo es: '+this.estadoActivo.name)
                        this.selectCiudades.disabled = false;
                    }
                }
                
                this.ciudadActiva = {
                    id: '', 
                    id_state: '', 
                    name: ''
                }
                
                this.selectCiudades = {
                    disabled: false,
                    contenido: ''
                   }
                   
                this.cargarCiudades()
                
            }
            
        },
        actualizarCiudadActiva: function(){
            if(this.selectCiudades.contenido!=''){
                let item;
                for(var i=0; i<this.ciudades.length; i++){
                    if(this.ciudades[i].name==this.selectCiudades.contenido){
                        this.ciudadActiva.id = this.ciudades[i].id
                        this.ciudadActiva.name = this.ciudades[i].name
                        this.ciudadActiva.id_state = this.ciudades[i].id_state
                        console.log('el estado activo es: '+this.ciudadActiva.name)
                        this.selectCiudades.disabled = false;
                    }
                }
            }
        }
    },
    mounted (){
        this.cargarPaises()
    }
}).$mount('#app')