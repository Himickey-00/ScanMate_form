"use client"

import { useFormStore } from "@/store/formStore";
import Link from 'next/link';

import { Checkbox } from "@/components/ui/checkbox"

import { useState, useEffect } from "react"
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { ChevronRight, Check } from "lucide-react"

const steps = ["契約者情報入力", "プラン選択", "支払い情報入力", "入力情報確認", "お申し込み完了"]

interface PlanOption {
  id: string;
  name: string;
}

export default function PaymentPage() {
  const [agreed, setAgreed] = useState(false);

  const searchParams = useSearchParams();
  useEffect(() => {
    const param = searchParams.get('agreed');
    if (param === '1' || param === 'true') {
      setAgreed(true);
    }
  }, [searchParams]);

  const {
    selectedPlan,
    currentStep,
    setCurrentStep,
    companyName,
    companyNameKana,
    representativeName,
    representativeNameKana,
    contactName,
    contactNameKana,
    mobileNumber1,
    mobileNumber2,
    mobileNumber3,
    phoneNumber1,
    phoneNumber2,
    phoneNumber3,
    email,
    postalCode,
    prefecture,
    cityWard,
    building,
    buildingDetail,
    agencyName,
    agencyCode,
    agencyRepName,
    serviceStartDate,
    cardNumber,
    cardName,
    expiry,
  } = useFormStore();

  useEffect(() => {
    console.debug('Confirm page form store values:', { selectedPlan, plan: selectedPlan, expiry, cardName });
  }, [selectedPlan, expiry, cardName]);

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

  // Helper functions
  function formatMobile(m1: string, m2: string, m3: string) {
    if (!(m1 || m2 || m3)) return 'xxx';
    return `${m1 || 'xxx'}-${m2 || 'xxx'}-${m3 || 'xxx'}`;
  }
  function formatPhone(p1: string, p2: string, p3: string) {
    if (!(p1 || p2 || p3)) return 'xxx';
    return `${p1 || 'xxx'}-${p2 || 'xxx'}-${p3 || 'xxx'}`;
  }
  function formatAddress(pref: string, city: string, bld: string, bldDetail: string) {
    const parts = [pref, city, bld, bldDetail].filter(Boolean);
    return parts.length > 0 ? parts.join(' ') : 'xxx';
  }
  // Plan info
  const plans: PlanOption[] = [
    { id: 'Light Plan', name: 'Light Plan' },
    { id: 'Standard Plan', name: 'Standard Plan'},
    { id: 'Premium Plan', name: 'Premium Plan'},
  ];
  const plan = plans.find(p => p.id === selectedPlan);

  // Mask card number
  function getMaskedCardNumber(num: string | undefined) {
    if (!num || num.length < 4) return "XXXX-XXXX-XXXX-1234";
    const last4 = num.slice(-4);
    return `XXXX-XXXX-XXXX-${last4}`;
  }

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
      <div className="max-w-6xl mx-auto px-6 py-10">
        <div className="bg-white rounded-lg shadow-md p-8">
          <h2 className="mt-3 mb-4 text-gray-700 text-center text-3xl font-semibold mb-9">入力情報確認</h2>

          {/* Contract Info */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-7 text-md mb-9 pl-10">
            <div className="font-semibold text-gray-700">会社名</div>
            <div>{companyName || 'xxx'}</div>
            <div className="font-semibold text-gray-700">会社名(フリガナ)</div>
            <div>{companyNameKana || 'xxx'}</div>
            <div className="font-semibold text-gray-700">会社代表者名</div>
            <div>{representativeName || 'xxx'}</div>
            <div className="font-semibold text-gray-700">会社代表者名(フリガナ)</div>
            <div>{representativeNameKana || 'xxx'}</div>
            <div className="font-semibold text-gray-700">担当者名</div>
            <div>{contactName || 'xxx'}</div>
            <div className="font-semibold text-gray-700">担当者名（フリガナ）</div>
            <div>{contactNameKana || 'xxx'}</div>
            <div className="font-semibold text-gray-700">担当者携帯番号</div>
            <div>{formatMobile(mobileNumber1, mobileNumber2, mobileNumber3)}</div>
            <div className="font-semibold text-gray-700">電話番号</div>
            <div>{formatPhone(phoneNumber1, phoneNumber2, phoneNumber3)}</div>
            <div className="font-semibold text-gray-700">メールアドレス</div>
            <div>{email || 'xxx'}</div>
            <div className="font-semibold text-gray-700">郵便番号</div>
            <div>{postalCode || 'xxx'}</div>
            <div className="font-semibold text-gray-700">住所</div>
            <div>{formatAddress(prefecture, cityWard, building, buildingDetail)}</div>
            <div className="font-semibold text-gray-700">担当代理店名</div>
            <div>{agencyName || 'xxx'}</div>
            <div className="font-semibold text-gray-700">担当代理店コード</div>
            <div>{agencyCode || 'xxx'}</div>
            <div className="font-semibold text-gray-700">契約担当者名</div>
            <div>{agencyRepName || 'xxx'}</div>
          </div>

          <div className="border-t my-8" />

          {/* Plan section */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-4 mb-8 pl-10">
            <div className="font-semibold text-gray-700">契約プラン</div>
            <div>
              <span className="inline-block px-3 py-1 rounded-full bg-[#4DBBC1]/10 text-[#4DBBC1] font-semibold">
                {plan?.name ?? selectedPlan ?? 'xxx'}
              </span>
            </div>
            <div className="font-semibold text-gray-700">サービス開始日</div>
            <div>{serviceStartDate || 'xxx'}</div>
          </div>

          <div className="border-t my-8" />

          {/* Credit card section */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-4 mb-8 pl-10">
            <div className="font-semibold text-gray-700">クレジットカード番号</div>
            <div>{getMaskedCardNumber(cardNumber)}</div>
            <div className="font-semibold text-gray-700">有効期限</div>
            <div>{expiry && expiry.trim() !== '' ? expiry : 'xxx'}</div>
            <div className="font-semibold text-gray-700">名義</div>
            <div>{cardName && cardName.trim() !== '' ? cardName : 'xxx'}</div>
          </div>
        </div>
      </div>

      {/* Agreement checkbox */}
      <div>
        <div>
          <div className="flex items-center justify-center mb-6">
            <Checkbox id="agreement" checked={agreed} onCheckedChange={(v) => setAgreed(!!v)} className="mr-2 border-1 border-gray-500 rounded-sm bg-white" />
            <Label htmlFor="agreement" className="text-gray-800 text-md">
              <span className="mr-1">
                <Link href="/privacy_policy" className="underline">利用規約とプライバシーポリシー</Link>
                に同意します
              </span>
            </Label>
          </div>


          {/* Navigation Buttons */}
          <div className="flex items-center justify-center space-x-4 mt-8">
            <Link href="/">
              <Button
                className="rounded-md px-8 py-6 bg-gray-500 text-white text-md font-semibold hover:bg-gray-300 disabled:opacity-50">
                入力内容を修正する
              </Button>
            </Link>
            <Link href="/complete">
              <Button
                disabled={!agreed}
                className={
                  `rounded-md px-10 py-8 text-lg font-semibold ${agreed ? 'bg-[#4DBBC1] text-white hover:bg-[#4DBBC1]/60' : 'bg-[#4DBBC1]/60 text-white opacity-50 cursor-not-allowed'}`
                }>
                申し込む
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}
