"use client";
import { GitHubIcon, XIcon } from "./icon";
type SocialMediaItem = {
  name: string;
  href: string;
  icon: React.ComponentType<React.SVGProps<SVGSVGElement>>;
  label?: string;
};
export default function ConverterFooter() {
  const currentYear = new Date().getFullYear();
  // 外链数据
  const links = [
    { name: "帮助中心", href: "#" },
    { name: "隐私政策", href: "#" },
    { name: "服务条款", href: "#" },
    { name: "联系我们", href: "#" },
  ];
  // 社媒分享
  const socialMedia: SocialMediaItem[] = [
    {
      name: "X",
      href: "#",
      icon: XIcon,
      label: "X官方账号",
    },
    {
      name: "Github",
      href: "#",
      icon: GitHubIcon,
      label: "GitHub仓库",
    },
  ];
  return (
    <footer className="bg-gray-50 border-t border-gray-200 mt-auto ">
      <div className="mx-auto max-w-7xl px-6 py-12 md:flex md:items-center md:justify-between lg:px-8">
        {/** 外链导航 */}
        <nav className="flex flex-wrap justify-center gap-8 md:order-1">
          {links.map((link, index) => (
            <a
              href="link.href"
              key={link.name}
              className="text-sm leading-6 text-gray-600 hover:text-gray-900 transition-colors"
            >
              {link.name}
            </a>
          ))}
        </nav>
        {/** 社交媒体分享 */}
        <div className="mt-8 flex justify-center space-x-6 md:order-2 md:mt-0">
          {socialMedia.map((item) => {
            const IconComponent = item.icon;

            return (
              <a
                href="item.href"
                key={item.name}
                className="text-gray-400 hover:text-gray-500 transition-colors"
                aria-label={item.label || item.name}
              >
                <span className="sr-only">{item.name}</span>
                <IconComponent />
              </a>
            );
          })}
        </div>
        {/* 版权信息 */}
        <p className="mt-8 text-center text-xs leading-5 text-gray-500 md:order-first md:mt-0">
          &copy; {currentYear} Yinglian. All rights reserved.
        </p>
      </div>
    </footer>
  );
}
