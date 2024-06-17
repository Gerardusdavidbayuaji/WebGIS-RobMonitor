import { useEffect, useState } from "react";

interface SidebarProps {
  activateParam: string | null;
}

const Sidebar = (props: SidebarProps) => {
  const [isVisible, setIsVisible] = useState(false);
  const { activateParam } = props;

  useEffect(() => {
    if (activateParam) {
      setIsVisible(true);
    } else {
      setIsVisible(false);
    }
  }, [activateParam]);

  return (
    <div
      className={`fixed top-14 right-0 p-4 z-10 transform transition-transform duration-300 ${
        isVisible ? "translate-x-0" : "translate-x-full"
      }`}
    >
      {activateParam && (
        <div className="bg-[#292929] border border-[#94949469] h-4/6 min-h-[525px] w-1/4 min-w-[237px] rounded-lg">
          <p className="flex text-[#ff6d1f] items-center justify-center m-2">
            Sidebar {activateParam}
          </p>
        </div>
      )}
    </div>
  );
};

export default Sidebar;
