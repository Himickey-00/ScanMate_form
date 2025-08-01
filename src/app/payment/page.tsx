"use client"

import { useFormStore } from "@/store/formStore";
import Link from 'next/link';

import { Checkbox } from "@/components/ui/checkbox"

import { useState, useEffect } from "react"
import { usePathname } from 'next/navigation';
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { ChevronRight, Check } from "lucide-react"

const steps = ["契約者情報入力", "プラン選択", "支払い情報入力", "入力情報確認", "お申し込み完了"]

interface PlanOption {
  id: string;
  name: string;
  monthlyFee: string;
  monthlyPages: string;
  overageFee: string;
}
const plans: PlanOption[] = [
  { id: "light",    name: "Light Plan",    monthlyFee: "月額30,000円", monthlyPages: "月1,800ページ",   overageFee: "上限枚数以降は15円/枚" },
  { id: "standard", name: "Standard Plan", monthlyFee: "月額100,000円", monthlyPages: "月10,000ページ",  overageFee: "上限枚数以降は15円/枚" },
  { id: "premium",  name: "Premium Plan",  monthlyFee: "月額200,000円", monthlyPages: "月30,000ページ",  overageFee: "上限枚数以降は5円/枚" },
];

export default function PaymentPage() {
  const { selectedPlan, currentStep, setCurrentStep } = useFormStore();

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

  const plan = plans.find(p => p.id === selectedPlan);

  const [cardNumber, setCardNumber] = useState("");
  const [cardNumberError, setCardNumberError] = useState("");
  const [cardName, setCardName] = useState("");
  const [cardNameError, setCardNameError] = useState("");
  const [expiry, setExpiry] = useState("");
  const [expiryError, setExpiryError] = useState("");
  const [cvv, setCvv] = useState("");
  const [cvvError, setCvvError] = useState("");

  const handleCardNumberChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const v = e.target.value;
    setCardNumber(v);
    const clean = v.replace(/\s+/g, "");
    setCardNumberError(/^\d{13,19}$/.test(clean) ? "" : "カード番号は13〜19桁の数字で入力してください");
  };
  const handleCardNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const v = e.target.value;
    setCardName(v);
    setCardNameError(v.trim() ? "" : "名義は必須です");
  };
  const handleExpiryChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const v = e.target.value;
    setExpiry(v);
    setExpiryError(/^(0[1-9]|1[0-2])\/\d{2}$/.test(v) ? "" : "有効期限はMM/YY形式で入力してください");
  };
  const handleCvvChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const v = e.target.value;
    setCvv(v);
    setCvvError(/^\d{3,4}$/.test(v) ? "" : "セキュリティコードは3～4桁の数字で入力してください");
  };


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
            <div className="space-y-8">
              <h3 className="mt-3 mb-4 text-gray-700 text-center text-3xl font-semibold">支払い情報入力</h3>
              <p className="text-xl text-center text-gray-600 mb-8">ご契約プラン</p>
        {plan && (
  <div className="max-w-2xl mx-auto border-4 rounded-2xl px-6 py-8 mb-12 shadow-md border-[#4DBBC1] bg-white">
    <div className="flex items-center justify-between gap-8">
      <div className="flex-1 pr-6">
        <h4 className="text-3xl font-bold text-gray-700 mx-8">{plan.name}</h4>
      </div>
      <div className="flex flex-col text-lg text-gray-700 space-y-2 flex-shrink-0 mx-8">
        <div className="flex items-center gap-2">
          <Check className="h-6 w-6 text-teal-500" />
          <span>{plan.monthlyFee}</span>
        </div>
        <div className="flex items-center gap-2">
          <Check className="h-6 w-6 text-teal-500" />
          <span>{plan.monthlyPages}</span>
        </div>
        <div className="flex items-center gap-2">
          <Check className="h-6 w-6 text-teal-500" />
          <span>{plan.overageFee}</span>
        </div>
      </div>
    </div>
  </div>
)}
        
        {/* Credit Card Form */}
        <div className="space-y-8">
          {/* Card Number */}
          <div className="space-y-2">
              <Label className="text-sm font-medium text-gray-700">
                クレジットカード番号 <span className="text-red-500 text-xs">※必須項目</span>
              </Label>
            <Input
              value={cardNumber}
              onChange={handleCardNumberChange}
              placeholder="1234 5678 9012 3456"
              className="rounded border-gray-300 focus:border-teal-500 focus:ring-teal-500 w-[50%] max-w-md h-[44px] py-3"
            />
            {cardNumberError && <p className="text-red-500 text-xs">{cardNumberError}</p>}
          </div>
          {/* Card Name */}
          <div className="space-y-2">
              <Label className="text-sm font-medium text-gray-700">
                名義 <span className="text-red-500 text-xs">※必須項目</span>
              </Label>
            <Input
              value={cardName}
              onChange={handleCardNameChange}
              placeholder="TARO YAMADA"
              className="rounded border-gray-300 focus:border-teal-500 focus:ring-teal-500 w-[50%] max-w-md h-[44px] py-3"
            />
            {cardNameError && <p className="text-red-500 text-xs">{cardNameError}</p>}
          </div>
          <div className="flex space-x-6">
            {/* Expiry */}
            <div className="space-y-2 w-1/2">
              <Label className="text-sm font-medium text-gray-700">
                有効期限 <span className="text-red-500 text-xs">※必須項目</span>
              </Label>
              <Input
                value={expiry}
                onChange={handleExpiryChange}
                placeholder="MM/YY"
                className="rounded border-gray-300 focus:border-teal-500 focus:ring-teal-500 w-[50%] max-w-md h-[44px] py-3"
              />
              {expiryError && <p className="text-red-500 text-xs">{expiryError}</p>}
            </div>
            {/* CVV */}
            <div className="space-y-2 w-1/2">
              <Label className="text-sm font-medium text-gray-700">
                セキュリティコード <span className="text-red-500 text-xs">※必須項目</span>
              </Label>
              <Input
                value={cvv}
                onChange={handleCvvChange}
                placeholder="123"
                className="rounded border-gray-300 focus:border-teal-500 focus:ring-teal-500 w-[50%] max-w-md h-[44px] py-3"
              />
              {cvvError && <p className="text-red-500 text-xs">{cvvError}</p>}
            </div>
          </div>
        </div>
      </div>
     </div>

           {/* Navigation Buttons */}
            <div className="flex items-center justify-center space-x-4 mt-8">
              <Link href="/plan">
                <Button
                  className="rounded-md px-8 py-6 bg-gray-500 text-white text-md font-semibold hover:bg-gray-300 disabled:opacity-50">
                  戻る
                </Button>
              </Link>

              <Link href="/confirm">
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
