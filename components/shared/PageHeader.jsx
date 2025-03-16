export default function PageHeader({ title, subtitle }) {
  return (
    
        <div  className="PageHeader py-8 lg:py-24 animate_moveUp">
          <div className="PageHeader__subheader text-zinc-500 font-semibold mb-8">{title}</div>
          <h1 className="PageHeader__title max-w-[920px]">{subtitle}</h1>
        </div>
 
  )
}
