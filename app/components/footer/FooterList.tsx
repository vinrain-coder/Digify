interface FooterListProps {
    children: React.ReactNode}

const FooterList: React.FC<FooterListProps> = ({children}) => {
  return (
    <div className="w-full sm:w-0.5 md:w-0.25 lg:w-1/6 mb-6 flex flex-col gap-2">
        {children}
    </div>
  
);
};

export default FooterList;