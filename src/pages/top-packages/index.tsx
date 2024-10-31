import Pagination from "@/components/molecules/Pagination";
import Laptop from "@/components/templates/laptop/Laptop";
import Mobile from "@/components/templates/mobile/Mobile";
import fetchData from "@/helper/FetchData";
import { ToursData } from "@/types/tour";
import { useState, useEffect } from "react";
import { useRouter } from "next/router"; // لاستخدام router لتحديث الـ URL

interface HomeProps {
  toursData: ToursData;
  currentPage: number; // تمرير الصفحة الحالية من الباث
}

export default function Home({ toursData, currentPage }: HomeProps) {
  console.log("🚀 ~ Home ~ toursData:", toursData);
  console.log("🚀 ~ Home ~ currentPage:", currentPage);
  const router = useRouter();
  const toursPerPage = 6;

  // حساب عدد الصفحات بناءً على البيانات
  const pageCount = Math.ceil(toursData.data.length / toursPerPage);

  // التعامل مع تغيير الصفحة
  const handlePageChange = (selectedItem: { selected: number }) => {
    const selectedPage = selectedItem.selected;

    // تحديث الـ URL لتضمين رقم الصفحة
    router.push({
      pathname: router.pathname,
      query: { ...router.query, page: selectedPage + 1 }, // حفظ رقم الصفحة الجديدة في الـ query
    });
  };

  return (
    <div className="md:p-6 p-0 bg-[#FAFAFA] lg:px-16 ">
      {/* Mobile view */}

      <div className="block lg:hidden">
        <Mobile toursData={toursData} />
      </div>

      {/* Laptop view */}
      <div className="hidden lg:block  ">
        <Laptop toursData={toursData} />
      </div>
    </div>
  );
}

export async function getServerSideProps(context: any) {
  const { query } = context;

  const currentPage = query.page ? parseInt(query.page) : 1;
  let endpoint = `tours?type=tour_package`;
  if (Object.keys(query).length > 0) {
    const queryParams = new URLSearchParams(query).toString();
    endpoint += `&${queryParams}`;
  }
  const data: ToursData = await fetchData(endpoint);
  return {
    props: {
      toursData: data,
      currentPage,
    },
  };
}
