import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";

export default function NotFound() {
  const t = useTranslations("NotFound");

  return (
    <div className="flex flex-col items-center justify-center min-h-screen gap-4 p-8">
      <h1 className="text-6xl font-bold text-foreground">404</h1>
      <p className="text-lg text-muted-foreground">{t("description")}</p>
      <Link
        href="/"
        className="mt-4 px-6 py-3 rounded-full bg-foreground text-background font-medium text-sm transition-colors hover:bg-[#383838] dark:hover:bg-[#ccc]"
      >
        {t("backHome")}
      </Link>
    </div>
  );
}
