const btn = document.getElementById('btn');
const select = document.getElementById('select');
const inp = document.getElementById('inp');
const container = document.getElementById('container');
const html = document.querySelector("html");

    const getData = async () => {
        let res = await fetch("https://restcountries.com/v3.1/all?fields=name,flags,capital,population,region");
        let data = await res.json();
        console.log(data[0]);
        
        container.innerHTML = '';
        data.forEach((value) => {
            let card = document.createElement("div");
            card.classList.add(
                "w-full",
                "max-w-[300px]",
                "border",
                "border-solid",
                "border-gray-600",
                "rounded-lg",
                "overflow-hidden",
                "shadow-md",
                "dark:bg-[#2B3844]"
            )
            card.innerHTML = `
                <div class="w-full object-cover">
                      <img src="${value.flags.png}" class="w-full h-[160px] object-cover" alt="flag" />
                    </div>
                    <div class="p-4 flex flex-col gap-2">
                      <h1 class="font-extrabold text-xl dark:text-white">${value.name.common}</h1>
                      <span class="text-sm font-semibold dark:text-white">Population: ${value.population}</span>
                      <span class="text-sm font-semibold dark:text-white">Region: ${value.region}</span>
                      <span class="text-sm font-semibold dark:text-white">Capital: ${value.capital[0]}</span>
                    </div>
            `
            container.append(card);
        });
    }
    

    getData()


    select.addEventListener("change", (e) => {
        let sorted = [...data];
      
        if (e.target.value === "A-Z") {
          sorted.sort((a, b) => a.name.common.localeCompare(b.name.common));
        } else if (e.target.value === "Z-A") {
          sorted.sort((a, b) => b.name.common.localeCompare(a.name.common));
        } else if (e.target.value === "population") {
          sorted.sort((a, b) => b.population - a.population);
        } else if (e.target.value === "topopulation") {
          sorted.sort((a, b) => a.population - b.population); 
        }
      
        getData(sorted);
      });
    

btn.addEventListener("click", () => {
    html.classList.toggle("dark");
})

