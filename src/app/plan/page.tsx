"use client"

import { useFormStore } from "@/store/formStore";
import Link from 'next/link';

// Removed import of Select components
import { Checkbox } from "@/components/ui/checkbox"

import { useEffect } from "react"
import { usePathname } from 'next/navigation';
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Check, ChevronRight } from "lucide-react"

const steps = ["契約者情報入力", "プラン選択", "支払い情報入力", "入力情報確認", "お申し込み完了"]

interface PlanOption {
  id: string
  name: string
  monthlyFee: string
  monthlyPages: string
  overageFee: string
}

const plans: PlanOption[] = [
  {
    id: "light",
    name: "Light Plan",
    monthlyFee: "月額30,000円",
    monthlyPages: "月1,800ページ",
    overageFee: "上限枚数以降は15円/枚",
  },
  {
    id: "standard",
    name: "Standard Plan",
    monthlyFee: "月額100,000円",
    monthlyPages: "月10,000ページ",
    overageFee: "上限枚数以降は15円/枚",
  },
  {
    id: "premium",
    name: "Premium Plan",
    monthlyFee: "月額200,000円",
    monthlyPages: "月30,000ページ",
    overageFee: "上限枚数以降は5円/枚",
  },
]

export default function PlanPage() {
  const {
    selectedPlan,
    setSelectedPlan,
    serviceStartDate,
    setServiceStartDate,
    currentStep,
    setCurrentStep,
  } = useFormStore();

  const pathname = usePathname();
  const normalizedPath = pathname.replace(/\/+$/, "") || "/";
  const stepMap: Record<string, number> = {
    "/": 0,
    "/plan": 1,
    "/payment": 2,
    "/confirm": 3,
    "/complete": 4,
  };
  const derivedStep = stepMap[normalizedPath] ?? 0;

  // Compute today's date string for min attribute
  const todayDate = new Date();
  const yyyy = todayDate.getFullYear();
  const mm = String(todayDate.getMonth() + 1).padStart(2, '0');
  const dd = String(todayDate.getDate()).padStart(2, '0');
  const todayString = `${yyyy}-${mm}-${dd}`; // for min attribute to prevent past dates

  useEffect(() => {
    if (currentStep !== derivedStep) {
      setCurrentStep(derivedStep);
    }
  }, [derivedStep, currentStep, setCurrentStep]);

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Header */}
      <div className="bg-white px-6 py-4 border-b">
        <div className="max-w-6xl mx-auto">
          <h1 className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-green-500 inline-block">ScanMate</h1>
        </div>
      </div>

      {/* Hero Banner */}
      <div
        className="bg-[url('/header.png')] bg-cover bg-center px-6 py-30 min-h-[400px]"
      >
        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl font-bold text-white mb-3">ScanMateお申し込みフォーム</h2>
          <button className="text-white text-xl underline hover:no-underline">ガイドラインを見る</button>
        </div>
      </div>

      {/* Breadcrumb */}
      <div className="bg-white min-h-[150px]">
        <div className="max-w-6xl mx-auto px-6 py-10">
          <div className="flex items-center justify-center">
            <div className="flex items-center bg-white border-2 border-[#4DBBC1] rounded-md p-6">
              {steps.map((step, index) => (
                <div key={index} className="flex items-center">
                  <div
                    className={`px-4 py-4 text-mid font-medium rounded-md transition-all ${
                      index === derivedStep
                        ? "bg-[#4DBBC1] text-white font-semibold border-2 border-[#4DBBC1]"
                        : index < derivedStep
                          ? "bg-[#4DBBC1]/10 text-[#4DBBC1] border border-[#4DBBC1]/20"
                          : "text-gray-500 border border-gray-300 rounded-md"
                    }`}
                  >
                    {step}
                  </div>
                  {index < steps.length - 1 && <ChevronRight className="mx-2 h-4 w-4 text-teal-400" />}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="bg-teal-50 min-h-screen">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="bg-white rounded-2xl shadow-lg p-8">
            <div className="space-y-6">
              <h3 className="mt-3 mb-4 text-gray-700 text-center text-3xl font-semibold">プラン選択</h3>
              <p className="text-center text-gray-600">ご契約のプランを選択してください。</p>

              {/* Plan Selection Cards */}
              {plans.map(pOption => {
                const isSelected = selectedPlan === pOption.id;
                return (
                  <div
                    key={pOption.id}
                    className={`cursor-pointer max-w-2xl mx-auto border-4 rounded-2xl px-6 py-8 mb-8 transition-transform duration-200 ease-out transform will-change-transform shadow-md hover:shadow-2xl hover:-translate-y-1
                      ${isSelected ? 'border-[#4DBBC1] bg-[#E6F7F7]' : 'border-[#4DBBC1]/50 bg-white'}`}
                    onClick={() => setSelectedPlan(pOption.id)}
                  >
                    <div className="flex items-center justify-between gap-8">
                      <div className="flex-1 pr-6">
                        <h4 className="text-3xl font-bold text-gray-700 mx-8">{pOption.name}</h4>
                      </div>
                      <div className="flex flex-col text-lg text-gray-700 space-y-2 flex-shrink-0 mx-8">
                        <div className="flex items-center gap-2">
                          <Check className="h-6 w-6 text-teal-500" />
                          <span>{pOption.monthlyFee}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <Check className="h-6 w-6 text-teal-500" />
                          <span>{pOption.monthlyPages}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <Check className="h-6 w-6 text-teal-500" />
                          <span>{pOption.overageFee}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}

              {/* Start Date Input */}
              <div className="mt-6 text-center">
                <p className="mb-4 text-gray-700">サービス開始希望日を入力してください。</p>
                <Input
                  type="date"
                  value={serviceStartDate}
                  onChange={e => {
                    const val = e.target.value;
                    if (val < todayString) return; // ignore past date
                    setServiceStartDate(val);
                  }}
                  min={todayString}
                  className="rounded border-gray-300 focus:border-teal-500 focus:ring-teal-500 w-[95%] max-w-md h-[44px] py-3 mx-auto w-1/2"
                />
              </div>
            </div>
          </div>

           {/* Navigation Buttons */}
            <div className="flex items-center justify-center space-x-4 mt-8">
              <Link href="/">
                <Button
                  className="rounded-md px-8 py-6 bg-gray-500 text-white text-md font-semibold hover:bg-gray-300 disabled:opacity-50">
                  戻る
                </Button>
              </Link>

              <Link href="/payment">
                <Button
                  className="rounded-md px-10 py-8 bg-[#4DBBC1] text-white text-lg font-semibold hover:bg-[#4DBBC1]/60">
                  次へ
                </Button>
              </Link>          
            </div>
          </div>
        </div>
      </div>
  )
}
