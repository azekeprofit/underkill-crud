// https://codepen.io/optimisticweb/pen/oNOBwBq

import './scrolling.css'

interface company{
    name:string;
    price:number;
    change:number;
  }
  
  const companies:company[]=[
    {name:'Apple',price:100, change:1},
    {name:'Aramco',price:700, change:-1},
    {name:'Microsoft',price:60, change:2},
    {name:'Sunsoft',price:80, change:-2},
    {name:'Sega',price:770, change:45},
    {name:'Nvidia',price:750, change:100},
    {name:'USA',price:750, change:100},
    {name:'Skynet',price:750, change:100},
    {name:'Weyland',price:750, change:100},
    {name:'Costco',price:750, change:-2},
    {name:'Walmart',price:750, change:-1},
    {name:'Bell',price:750, change:-1},
    {name:'The Times',price:750, change:-5},
    {name:'Lloyd\'s',price:750, change:3},
    {name:'Cook tourism',price:750, change:2},
  ];
  
  function Company({c:{name,price,change}}:{c:company}){
    return <li key={name} className={`${change>0?'before:content-[↑]':'before:content-[↓]'}`}>
    <span className='font-bold'>{name}</span>
    <span className='font-bold ms-4 me-4'>{price}</span>
    <span className={`ms-4 me-4 ${change>0?'text-green-500':'text-red-500'}`}>{change}</span>
    </li>
  }
  
  function CompanyList({hidden}:{hidden:boolean}){
    return <ul aria-hidden={hidden} className='
     list-none flex gap-[--gap] 
     justify-between shrink-0
     min-w-full items-center animate-[scroll_20s_linear_infinite]
     group-hover:[animation-play-state:paused]'>
      {companies.map(c=><Company c={c} />)}
    </ul>
  }
  
export default function ScrollingCompanies(){
    return <div className='group font-sans py-8 border-solid border-y-1 
    select-none flex gap-[--gap] overflow-hidden w-[600px]'>
      <CompanyList hidden={false} />
      <CompanyList hidden={true} />
    </div>;
  }