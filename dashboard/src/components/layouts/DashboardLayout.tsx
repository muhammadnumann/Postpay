import { FunctionComponent, ReactChild, ReactElement } from 'react';
import NavBar from '@/components/NavbarDashboard/NavbarDashboard';
import FooterDashboard from '@/components/FooterDashboard/FooterDashboard';
interface DashboardLayoutProps {
  children: ReactElement | ReactChild;
  className?: String;
}

const DashboardLayout: FunctionComponent<DashboardLayoutProps> = ({
  children,
  className,
}) => {
  return (
    <div className={`min-w-full min-h-screen bg-white ${className}`}>
      <div className="flex">
        <div className="flex-1 w-full">
          <div className="flex flex-col justify-between h-full">
            <NavBar />
            <div className="w-max-[1100px] lg:px-[200px] lg:py-[64px] p-4 min-h-screen h-full relative">
              {children}
            </div>
            <FooterDashboard />
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardLayout;
