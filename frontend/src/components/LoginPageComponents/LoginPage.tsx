import React from 'react'

type Props = {}

type Links = {
  name: string,
  href: string,
  svg: JSX.Element
}

const loginLinks:Links[] = [
  {
    name:'Github',
    href: '/auth/login/github',
    svg: <svg  xmlns="http://www.w3.org/2000/svg"  width="24"  height="24"  viewBox="0 0 24 24"  fill="none"  stroke="currentColor"  strokeWidth="2"  strokeLinecap="round"  strokeLinejoin="round"  className="icon icon-tabler icons-tabler-outline icon-tabler-brand-github"><path stroke="none" d="M0 0h24v24H0z" fill="none"/><path d="M9 19c-4.3 1.4 -4.3 -2.5 -6 -3m12 5v-3.5c0 -1 .1 -1.4 -.5 -2c2.8 -.3 5.5 -1.4 5.5 -6a4.6 4.6 0 0 0 -1.3 -3.2a4.2 4.2 0 0 0 -.1 -3.2s-1.1 -.3 -3.5 1.3a12.3 12.3 0 0 0 -6.2 0c-2.4 -1.6 -3.5 -1.3 -3.5 -1.3a4.2 4.2 0 0 0 -.1 3.2a4.6 4.6 0 0 0 -1.3 3.2c0 4.6 2.7 5.7 5.5 6c-.6 .6 -.6 1.2 -.5 2v3.5" /></svg>
  },
]
const LoginPage = (props: Props) => {
  return (
    <div className='flex flex-col justify-center items-center h-screen'>
      <div className='flex flex-col py-4 items-center w-2/3 md:w-1/4 border-4 border-black rounded-md'>
        <h1 className='text-3xl font-bold p-2'>Login / Sign Up</h1>
        {loginLinks.map((link, index) => (
          <a key={index} className={`text-center px-4 py-2 rounded-md m-3 w-3/4  hover:bg-black flex flex-row justify-center items-center gap-4 hover:text-white border-4 border-black`} href={link.href}> {link.svg} {link.name}</a>
        ))}
      </div>
    </div>
  )
}

export default LoginPage