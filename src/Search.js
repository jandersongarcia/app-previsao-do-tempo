import {useState} from 'react';


export default function Search(props){

    const [cidade, setCidade] = useState("");

    function searchInput(e){
        e.preventDefault();

        setCidade("<p>Procurando...</p>");

        let currentValue = document.querySelector('[name=searchInput]').value;
        /* Faz a requisição */
        const url = `https://api.openweathermap.org/data/2.5/weather?q=${currentValue}&appid=4d8fb5b93d4af21d66a2948710284366&units=metric`;

        fetch(url)
            .then(Response=> Response.json())
            .then(data=>{
                const { main, name, sys, weather} = data;
                if(sys != undefined){

                    if(weather != undefined){
                        let graus = Math.round(main.temp);
                        const icon = `https://s3-us-west-2.amazonaws.com/s.cdpn.io/162656/${weather[0]["icon"]}.svg`;
                        setCidade(`
                            <p>${graus}ºC</p>
                            <p>${name} - ${sys.country}</p>
                            <img src="${icon}"/>
                        `)
                    }
                    
                } else {
                    setCidade("<p>Cidade não encontrada!</p>");
                }
            })
    }

    return(
        <div className="searchWraper">
            <div className="search">
                <h2>Previsão do Tempo!</h2>
                <form onSubmit={(e)=>searchInput(e)}>
                    <input placeholder={props.placeholder} type="text" name="searchInput"/>
                    <input type="submit" value="Pesquisar por cidade"/>
                </form>
            </div>

            {
                (cidade != '')?
                <div className="containerCidade" dangerouslySetInnerHTML={{__html: cidade}} />:
                <div className="searchCity" >😎</div>
            }

        </div>
    )
}