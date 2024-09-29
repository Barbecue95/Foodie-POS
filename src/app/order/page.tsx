import { MenuCategoryTabs } from "@/components/MenuCategoryTabs";
import { OrderAppHeader } from "@/components/OrderAppHeader";
import {
  getCompanyByTableId,
  getMenuCategoriesByTableId,
  getMenusByMenuCategoryIds,
} from "@/libs/action";
import { Box } from "@mui/material";
import { Prisma } from "@prisma/client";

interface Props {
  searchParams: {
    tableId: string;
  };
}

export type menuCategoriesType = Prisma.MenuCategoriesGetPayload<{
  include: { MenuCategoriesMenu: true };
}>;

export default async function Order({ searchParams }: Props) {
  const company = await getCompanyByTableId(searchParams.tableId);
  const menuCategories: menuCategoriesType[] = await getMenuCategoriesByTableId(
    searchParams.tableId
  );
  const menuCategoryIds = menuCategories.map((item) => item.id);

  const menus = await getMenusByMenuCategoryIds(menuCategoryIds);

  if (!company) return null;
  return (
    <Box>
      <OrderAppHeader company={company} />
      <MenuCategoryTabs
        tableId={searchParams.tableId}
        menuCategories={menuCategories}
        menus={menus}
      />
    </Box>
  );
}
