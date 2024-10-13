import { NavLink } from "react-router";

const routes = ['Home', 'About', 'Users'];

export default function Nav() {
  return (
    <nav className="bg-sky-800">
      <ul className="container flex items-center p-3 text-gray-200">
        {routes.map((path)=> (<li key={path} className='mx-1.5 sm:mx-6'>
            <NavLink to={`/${path}`} end>
              {({isActive})=><span className={`border-b-2 hover:border-sky-600 ${isActive?"border-sky-600":"border-transparent"}`}>
                {path}
                </span>}
            </NavLink>
          </li>))}
      </ul>
    </nav>
  );
}
