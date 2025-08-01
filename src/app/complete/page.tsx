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
              <h3 className="mt-3 mb-4 text-gray-700 text-center text-3xl font-semibold">申し込みが完了しました</h3>
              <p className="text-center text-gray-600">お申し込み情報を確認後、ユーザーIDと初期パスワードをメールで送信いたします。<br /> 4営業日以上連絡がない場合は、お手数ですが下記メールにてお問い合わせください。</p>
              <p className="mb-3 text-gray-700 text-center text-xl font-bold">お問い合わせ先: mpc_info@mplantsc.co.jp</p>      
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
