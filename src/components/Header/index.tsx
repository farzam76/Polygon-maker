
export default function Header({children}:{children: React.ReactNode}){
    return(
        <header className="w-full flex-shrink-0 bg-white border-b border-gray-200">
          {children}
        </header>
    )
}