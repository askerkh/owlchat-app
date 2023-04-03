interface IProps {
  children: React.ReactNode
  className?: string
}

type Props = IProps &
  Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, "className">

const Button: React.FC<Props> = ({ children, className, ...props }) => {
  return (
    <button {...props} className={`iconButton ${className}`}>
      {children}
    </button>
  )
}

export default Button
