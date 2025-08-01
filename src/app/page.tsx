// app/page.tsx または app/contract/page.tsx などに
// app/page.tsx または app/contract/page.tsx などに
"use client"

import { useEffect, useState } from "react";
import { usePathname } from 'next/navigation';
import Link from 'next/link';

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Checkbox } from "@/components/ui/checkbox"
import { ChevronRight } from "lucide-react"
import { useFormStore } from '@/store/formStore'

export default function Page() {
const steps = ["契約者情報入力", "プラン選択", "支払い情報入力", "入力情報確認", "お申し込み完了"];

  // Derive currentStep from pathname
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

const {
  formData,
  setFormData,
  errors,
  setErrors,
  touched,
  setTouched,
} = useFormStore();

const {
  companyName,
  setCompanyName,
  companyNameKana,
  setCompanyNameKana,
  representativeName,
  setRepresentativeName,
  representativeNameKana,
  setRepresentativeNameKana,
  contactName,
  setContactName,
  contactNameKana,
  setContactNameKana,
  phoneNumber1,
  setPhoneNumber1,
  phoneNumber2,
  setPhoneNumber2,
  phoneNumber3,
  setPhoneNumber3,
  mobileNumber1,
  setMobileNumber1,
  mobileNumber2,
  setMobileNumber2,
  mobileNumber3,
  setMobileNumber3,
  email,
  setEmail,
  emailConfirm,
  setEmailConfirm,
  postalCode,
  setPostalCode,
  prefecture,
  setPrefecture,
  cityWard,
  setCityWard,
  building,
  setBuilding,
  buildingDetail,
  setBuildingDetail,
  agencyRepName,
  setAgencyRepName,
  agencyRepNameKana,
  setAgencyRepNameKana,
  agencyName,
  setAgencyName,
  agencyCode,
  setAgencyCode,
  sameAsRepresentative,
  setSameAsRepresentative,
} = useFormStore();


// Validation error states for each field
const [companyNameError, setCompanyNameError] = useState("");
const [companyNameKanaError, setCompanyNameKanaError] = useState("");
const [representativeNameError, setRepresentativeNameError] = useState("");
const [representativeNameKanaError, setRepresentativeNameKanaError] = useState("");
const [contactNameError, setContactNameError] = useState("");
const [contactNameKanaError, setContactNameKanaError] = useState("");
const [phoneNumberError, setPhoneNumberError] = useState("");
const [mobileNumberError, setMobileNumberError] = useState("");
const [emailError, setEmailError] = useState("");
const [emailConfirmError, setEmailConfirmError] = useState("");
const [postalCodeError, setPostalCodeError] = useState("");
const [prefectureError, setPrefectureError] = useState("");
const [cityWardError, setCityWardError] = useState("");
const [buildingError, setBuildingError] = useState("");
const [agencyRepNameError, setAgencyRepNameError] = useState("");
const [agencyRepNameKanaError, setAgencyRepNameKanaError] = useState("");
const [agencyNameError, setAgencyNameError] = useState("");
const [agencyCodeError, setAgencyCodeError] = useState("");

const prefectures = [
  "北海道",
  "青森県",
  "岩手県",
  "宮城県",
  "秋田県",
  "山形県",
  "福島県",
  "茨城県",
  "栃木県",
  "群馬県",
  "埼玉県",
  "千葉県",
  "東京都",
  "神奈川県",
  "新潟県",
  "富山県",
  "石川県",
  "福井県",
  "山梨県",
  "長野県",
  "岐阜県",
  "静岡県",
  "愛知県",
  "三重県",
  "滋賀県",
  "京都府",
  "大阪府",
  "兵庫県",
  "奈良県",
  "和歌山県",
  "鳥取県",
  "島根県",
  "岡山県",
  "広島県",
  "山口県",
  "徳島県",
  "香川県",
  "愛媛県",
  "高知県",
  "福岡県",
  "佐賀県",
  "長崎県",
  "熊本県",
  "大分県",
  "宮崎県",
  "鹿児島県",
  "沖縄県",
]

interface FormData {
  companyName: string
  companyNameKana: string
  representativeName: string
  representativeNameKana: string
  contactName: string
  contactNameKana: string
  phoneNumber1: string
  phoneNumber2: string
  phoneNumber3: string
  mobileNumber1: string
  mobileNumber2: string
  mobileNumber3: string
  email: string
  emailConfirm: string
  postalCode: string
  prefecture: string
  cityWard: string
  building: string
  buildingDetail: string
  agencyRepName: string
  agencyRepNameKana: string
  agencyName: string
  agencyCode: string
  sameAsRepresentative: boolean
}

interface FormErrors {
  [key: string]: string | undefined
}


  // Validation functions
  const validateKatakana = (text: string): boolean => {
    const katakanaRegex = /^[ァ-ヶー\s]+$/
    return katakanaRegex.test(text)
  }

  const validateEmail = (email: string): boolean => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    return emailRegex.test(email)
  }

  const validatePhoneNumber = (num1: string, num2: string, num3: string): boolean => {
    return num1.length >= 2 && num2.length >= 2 && num3.length === 4
  }

  const validatePostalCode = (code: string): boolean => {
    return /^\d{7}$/.test(code)
  }

  // Postal code to address lookup (mock data - in real implementation, use API)
  const postalCodeLookup: Record<string, { prefecture: string; city: string }> = {
    "1020094": { prefecture: "東京都", city: "千代田区紀尾井町" },
    "1000001": { prefecture: "東京都", city: "千代田区千代田" },
    "1500002": { prefecture: "東京都", city: "渋谷区渋谷" },
    "1060032": { prefecture: "東京都", city: "港区六本木" },
    "1630001": { prefecture: "東京都", city: "新宿区西新宿" },
    "1040045": { prefecture: "東京都", city: "中央区築地" },
    "5300001": { prefecture: "大阪府", city: "大阪市北区梅田" },
    "4600002": { prefecture: "愛知県", city: "名古屋市中区丸の内" },
    "8120011": { prefecture: "福岡県", city: "福岡市博多区博多駅前" },
    "2310023": { prefecture: "神奈川県", city: "横浜市中区山下町" },
    "9800011": { prefecture: "宮城県", city: "仙台市青葉区上杉" },
    "0600001": { prefecture: "北海道", city: "札幌市中央区北一条西" },
  }

  const lookupAddress = (postalCode: string) => {
    const address = postalCodeLookup[postalCode]
    if (address) {
      setFormData({
        ...formData,
        prefecture: address.prefecture,
        cityWard: address.city,
      })
    }
  }

  // Real-time validation
  const validateField = (field: keyof FormData, value: string): string | undefined => {
    switch (field) {
      case "companyName":
        return value.trim() === "" ? "会社名は必須です" : undefined
      case "companyNameKana":
        if (value.trim() === "") return "会社名（フリガナ）は必須です"
        if (!validateKatakana(value)) return "カタカナで入力してください"
        return undefined
      case "representativeName":
        return value.trim() === "" ? "会社代表者名は必須です" : undefined
      case "representativeNameKana":
        if (value.trim() === "") return "会社代表者名（フリガナ）は必須です"
        if (!validateKatakana(value)) return "カタカナで入力してください"
        return undefined
      case "email":
        if (value.trim() === "") return "メールアドレスは必須です"
        if (!validateEmail(value)) return "正しいメールアドレス形式で入力してください"
        return undefined
      case "emailConfirm":
        if (value.trim() === "") return "メールアドレス確認は必須です"
        if (!validateEmail(value)) return "正しいメールアドレス形式で入力してください"
        if (value !== formData.email) return "メールアドレスが一致しません"
        return undefined
      case "postalCode":
        if (value.trim() === "") return "郵便番号は必須です"
        if (!validatePostalCode(value)) return "7桁の数字で入力してください"
        return undefined
      case "prefecture":
        return value === "" ? "都道府県を選択してください" : undefined
      case "cityWard":
        return value.trim() === "" ? "市区町村は必須です" : undefined
      case "building":
        return value.trim() === "" ? "番地は必須です" : undefined
      case "agencyRepName":
        return value.trim() === "" ? "契約担当者名は必須です" : undefined
      case "agencyRepNameKana":
        if (value.trim() === "") return "契約担当者名（フリガナ）は必須です"
        if (!validateKatakana(value)) return "カタカナで入力してください"
        return undefined
      default:
        return undefined
    }
  }

  const handleInputChange = (field: keyof FormData, value: string | boolean) => {
    if (field === "sameAsRepresentative") {
      if (value === true) {
        // copy representative into contact when checked
        setContactName(representativeName);
        setContactNameKana(representativeNameKana);
        setFormData({
          ...formData,
          sameAsRepresentative: true,
          contactName: representativeName,
          contactNameKana: representativeNameKana,
        });
      } else {
        // unchecking: just clear the flag, keep existing contact values
        setFormData({
          ...formData,
          sameAsRepresentative: false,
        });
      }
      return; // early return since handled
    }

    // for all other fields
    setFormData({
      ...formData,
      [field]: value,
    });

    // Real-time validation for string fields
    if (typeof value === "string" && touched[field]) {
      const error = validateField(field, value);
      // setErrors に undefined を含めない
      if (error !== undefined) {
        setErrors({
          ...errors,
          [field]: error
        });
      } else {
        // errorがundefinedの場合はerrorsからそのfieldを除外
        const { [field]: omit, ...rest } = errors;
        setErrors(rest);
      }
    }

    // Special case for email confirmation
    if (field === "email" && touched.emailConfirm) {
      const confirmError = validateField("emailConfirm", formData.emailConfirm);
      if (confirmError !== undefined) {
        setErrors({
          ...errors,
          emailConfirm: confirmError
        });
      } else {
        const { emailConfirm, ...rest } = errors;
        setErrors(rest);
      }
    }
  }

  const handleBlur = (field: keyof FormData) => {
    setTouched({
      ...touched,
      [field]: true
    });
    const error = validateField(field, formData[field] as string);
    // setErrors に undefined を含めない
    if (error !== undefined) {
      setErrors({
        ...errors,
        [field]: error
      });
    } else {
      const { [field]: omit, ...rest } = errors;
      setErrors(rest);
    }
  }
  // Keep contact fields in sync with representative if checkbox is checked
  useEffect(() => {
    if (sameAsRepresentative) {
      setContactName(representativeName);
      setContactNameKana(representativeNameKana);
      setFormData({
        ...formData,
        contactName: representativeName,
        contactNameKana: representativeNameKana,
      });
    }
  }, [sameAsRepresentative, representativeName, representativeNameKana]);
  
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
            {derivedStep === 0 && (
              <div className="space-y-8">
                <h3 className="mt-3 mb-10 text-gray-700 text-center text-3xl font-semibold">契約者情報入力</h3>

                 {/* Company Information */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label className="text-sm font-medium text-gray-700">
                      会社名 <span className="text-red-500 text-xs">※必須項目</span>
                    </Label>
                    <Input
                      id="companyName"
                      value={companyName}
                      onChange={(e) => {
                        setCompanyName(e.target.value);
                        const value = e.target.value;
                        setCompanyNameError(value.trim() === "" ? "会社名は必須です" : "");
                      }}
                      className="rounded border-gray-300 focus:border-teal-500 focus:ring-teal-500 w-[95%] max-w-md h-[44px] py-3"
                    />
                    {companyNameError && <p className="text-red-500 text-xs">{companyNameError}</p>}
                  </div>

                   <div className="space-y-2">
                    <Label className="text-sm font-medium text-gray-700">
                      会社名（フリガナ） <span className="text-red-500 text-xs">※必須項目</span>
                    </Label>
                    <Input
                      id="companyNameKana"
                      value={companyNameKana}
                      onChange={(e) => {
                        setCompanyNameKana(e.target.value);
                        const value = e.target.value;
                        if (value.trim() === "") setCompanyNameKanaError("会社名（フリガナ）は必須です");
                        else if (!/^[ァ-ヶー\s]+$/.test(value)) setCompanyNameKanaError("カタカナで入力してください");
                        else setCompanyNameKanaError("");
                      }}
                      className="rounded border-gray-300 focus:border-teal-500 focus:ring-teal-500 w-[95%] max-w-md h-[44px] py-3"
                    />
                    {companyNameKanaError && <p className="text-red-500 text-xs">{companyNameKanaError}</p>}
                  </div>
                </div>

                 <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label className="text-sm font-medium text-gray-700">
                      会社代表者名 <span className="text-red-500 text-xs">※必須項目</span>
                    </Label>
                    <p className="text-xs text-gray-500">姓名を続けて入力してください</p>
                    <Input
                      id="representativeName"
                      value={representativeName}
                      onChange={(e) => {
                        setRepresentativeName(e.target.value);
                        const value = e.target.value;
                        setRepresentativeNameError(value.trim() === "" ? "会社代表者名は必須です" : "");
                      }}
                      className="rounded border-gray-300 focus:border-teal-500 focus:ring-teal-500 w-[95%] max-w-md h-[44px] py-3"
                    />
                    {representativeNameError && <p className="text-red-500 text-xs">{representativeNameError}</p>}
                  </div>

                   <div className="space-y-2">
                    <Label className="text-sm font-medium text-gray-700">
                      会社代表者名（フリガナ） <span className="text-red-500 text-xs">※必須項目</span>
                    </Label>
                    <p className="text-xs text-gray-500">姓（カタカナ）と名（カタカナ）を続けて入力してください</p>
                    <Input
                      id="representativeNameKana"
                      value={representativeNameKana}
                      onChange={(e) => {
                        setRepresentativeNameKana(e.target.value);
                        const value = e.target.value;
                        if (value.trim() === "") setRepresentativeNameKanaError("会社代表者名（フリガナ）は必須です");
                        else if (!/^[ァ-ヶー\s]+$/.test(value)) setRepresentativeNameKanaError("カタカナで入力してください");
                        else setRepresentativeNameKanaError("");
                      }}
                      className="rounded border-gray-300 focus:border-teal-500 focus:ring-teal-500 w-[95%] max-w-md h-[44px] py-3"
                    />
                    {representativeNameKanaError && (
                      <p className="text-red-500 text-xs">{representativeNameKanaError}</p>
                    )}
                  </div>
                </div>

                 <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label className="text-sm font-medium text-gray-700">
                      担当者名 <span className="text-red-500 text-xs">※必須項目</span>
                    </Label>
                    <Input
                      id="contactName"
                      value={contactName}
                      onChange={(e) => {
                        setContactName(e.target.value);
                        const value = e.target.value;
                        setContactNameError(value.trim() === "" ? "担当者名は必須です" : "");
                      }}
                      className="rounded border-gray-300 focus:border-teal-500 focus:ring-teal-500 w-[95%] max-w-md h-[44px] py-3"
                      readOnly={sameAsRepresentative}
                    />
                    {contactNameError && <p className="text-red-500 text-xs">{contactNameError}</p>}
                  </div>

                   <div className="space-y-2">
                    <Label className="text-sm font-medium text-gray-700">
                      担当者名（フリガナ） <span className="text-red-500 text-xs">※必須項目</span>
                    </Label>
                    <Input
                      id="contactNameKana"
                      value={contactNameKana}
                      onChange={(e) => {
                        setContactNameKana(e.target.value);
                        const value = e.target.value;
                        if (value.trim() === "") setContactNameKanaError("担当者名（フリガナ）は必須です");
                        else if (!/^[ァ-ヶー\s]+$/.test(value)) setContactNameKanaError("カタカナで入力してください");
                        else setContactNameKanaError("");
                      }}
                      className="rounded border-gray-300 focus:border-teal-500 focus:ring-teal-500 w-[95%] max-w-md h-[44px] py-3"
                      readOnly={sameAsRepresentative}
                    />
                    {contactNameKanaError && <p className="text-red-500 text-xs">{contactNameKanaError}</p>}
                  </div>
                </div>

                 <div className="flex items-center space-x-2">
                  <Checkbox
                    id="sameAsRepresentative"
                    checked={sameAsRepresentative}
                    onCheckedChange={(checked) => handleInputChange("sameAsRepresentative", Boolean(checked))}
                  />
                  <Label htmlFor="sameAsRepresentative" className="text-sm">
                    会社代表者名と同一（自動入力されます）
                  </Label>
                </div>

                 {/* Contact Information */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label className="text-sm font-medium text-gray-700">
                      電話番号 <span className="text-red-500 text-xs">※必須項目</span>
                    </Label>
                    <div className="flex space-x-2">
                      <Input
                        id="phoneNumber1"
                        value={phoneNumber1}
                        onChange={(e) => {
                          setPhoneNumber1(e.target.value.replace(/\D/g, ""));
                          const n1 = e.target.value.replace(/\D/g, "");
                          setPhoneNumberError(
                            n1.length < 2 || phoneNumber2.length < 2 || phoneNumber3.length !== 4
                              ? "正しい電話番号を入力してください"
                              : ""
                          );
                        }}
                        className="rounded border-gray-300 focus:border-teal-500 focus:ring-teal-500 w-20 h-[44px] py-3"
                        maxLength={4}
                      />
                      <Input
                        id="phoneNumber2"
                        value={phoneNumber2}
                        onChange={(e) => {
                          setPhoneNumber2(e.target.value.replace(/\D/g, ""));
                          const n2 = e.target.value.replace(/\D/g, "");
                          setPhoneNumberError(
                            phoneNumber1.length < 2 || n2.length < 2 || phoneNumber3.length !== 4
                              ? "正しい電話番号を入力してください"
                              : ""
                          );
                        }}
                        className="rounded border-gray-300 focus:border-teal-500 focus:ring-teal-500 w-20 h-[44px] py-3"
                        maxLength={4}
                      />
                      <Input
                        id="phoneNumber3"
                        value={phoneNumber3}
                        onChange={(e) => {
                          setPhoneNumber3(e.target.value.replace(/\D/g, ""));
                          const n3 = e.target.value.replace(/\D/g, "");
                          setPhoneNumberError(
                            phoneNumber1.length < 2 || phoneNumber2.length < 2 || n3.length !== 4
                              ? "正しい電話番号を入力してください"
                              : ""
                          );
                        }}
                        className="rounded border-gray-300 focus:border-teal-500 focus:ring-teal-500 w-20 h-[44px] py-3"
                        maxLength={4}
                      />
                    </div>
                    {phoneNumberError && <p className="text-red-500 text-xs">{phoneNumberError}</p>}
                  </div>

                   <div className="space-y-2">
                    <Label className="text-sm font-medium text-gray-700">
                      携帯電話番号 <span className="text-red-500 text-xs">※必須項目</span>
                    </Label>
                    <div className="flex space-x-2">
                      <Input
                        id="mobileNumber1"
                        value={mobileNumber1}
                        onChange={(e) => {
                          setMobileNumber1(e.target.value.replace(/\D/g, ""));
                          const n1 = e.target.value.replace(/\D/g, "");
                          setMobileNumberError(
                            n1.length < 2 || mobileNumber2.length < 2 || mobileNumber3.length !== 4
                              ? "正しい携帯電話番号を入力してください"
                              : ""
                          );
                        }}
                        className="rounded border-gray-300 focus:border-teal-500 focus:ring-teal-500 w-20 h-[44px] py-3"
                        maxLength={4}
                      />
                      <Input
                        id="mobileNumber2"
                        value={mobileNumber2}
                        onChange={(e) => {
                          setMobileNumber2(e.target.value.replace(/\D/g, ""));
                          const n2 = e.target.value.replace(/\D/g, "");
                          setMobileNumberError(
                            mobileNumber1.length < 2 || n2.length < 2 || mobileNumber3.length !== 4
                              ? "正しい携帯電話番号を入力してください"
                              : ""
                          );
                        }}
                        className="rounded border-gray-300 focus:border-teal-500 focus:ring-teal-500 w-20 h-[44px] py-3"
                        maxLength={4}
                      />
                      <Input
                        id="mobileNumber3"
                        value={mobileNumber3}
                        onChange={(e) => {
                          setMobileNumber3(e.target.value.replace(/\D/g, ""));
                          const n3 = e.target.value.replace(/\D/g, "");
                          setMobileNumberError(
                            mobileNumber1.length < 2 || mobileNumber2.length < 2 || n3.length !== 4
                              ? "正しい携帯電話番号を入力してください"
                              : ""
                          );
                        }}
                        className="rounded border-gray-300 focus:border-teal-500 focus:ring-teal-500 w-20 h-[44px] py-3"
                        maxLength={4}
                      />
                    </div>
                    {mobileNumberError && <p className="text-red-500 text-xs">{mobileNumberError}</p>}
                  </div>
                </div>

                 <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label className="text-sm font-medium text-gray-700">
                      メールアドレス <span className="text-red-500 text-xs">※必須項目</span>
                    </Label>
                    <Input
                      id="email"
                      type="email"
                      value={email}
                      onChange={(e) => {
                        setEmail(e.target.value);
                        const value = e.target.value;
                        setEmailError(
                          value.trim() === ""
                            ? "メールアドレスは必須です"
                            : !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)
                            ? "有効なメールアドレスを入力してください"
                            : ""
                        );
                      }}
                      className="rounded border-gray-300 focus:border-teal-500 focus:ring-teal-500 w-[95%] max-w-md h-[44px] py-3"
                    />
                    {emailError && <p className="text-red-500 text-xs">{emailError}</p>}
                  </div>

                   <div className="space-y-2">
                    <Label className="text-sm font-medium text-gray-700">
                      メールアドレス（確認用） <span className="text-red-500 text-xs">※必須項目</span>
                    </Label>
                    <Input
                      id="emailConfirm"
                      type="email"
                      value={emailConfirm}
                      onChange={(e) => {
                        setEmailConfirm(e.target.value);
                        const value = e.target.value;
                        setEmailConfirmError(
                          value.trim() === ""
                            ? "メールアドレス確認は必須です"
                            : !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)
                            ? "有効なメールアドレスを入力してください"
                            : value !== email
                            ? "メールアドレスが一致しません"
                            : ""
                        );
                      }}
                      className="rounded border-gray-300 focus:border-teal-500 focus:ring-teal-500 w-[95%] max-w-md h-[44px] py-3"
                    />
                    {emailConfirmError && <p className="text-red-500 text-xs">{emailConfirmError}</p>}
                  </div>
                </div>

                 {/* Address Information */}
                <div className="space-y-2">
                  <Label className="text-sm font-medium text-gray-700">
                    郵便番号 <span className="text-red-500 text-xs">※必須項目</span>
                  </Label>
                  <p className="text-xs text-gray-500">ハイフンなしで入力</p>
                  <Input
                    id="postalCode"
                    value={postalCode}
                    onChange={(e) => {
                      const value = e.target.value.replace(/\D/g, "");
                      setPostalCode(value);
                      if (value.length === 7) {
                        lookupAddress(value);
                      }
                      setPostalCodeError(
                        value.trim() === ""
                          ? "郵便番号は必須です"
                          : !/^\d{7}$/.test(value)
                          ? "7桁の数字で入力してください"
                          : ""
                      );
                    }}
                    className="rounded border-gray-300 focus:border-teal-500 focus:ring-teal-500 w-32 h-[44px] py-3"
                    maxLength={7}
                  />
                  {postalCode.length === 7 && postalCodeLookup[postalCode] && (
                    <p className="text-xs text-teal-600 mt-1">✓ 住所が自動入力されました</p>
                  )}
                  {postalCodeError && <p className="text-red-500 text-xs">{postalCodeError}</p>}
                </div>

                 <div className="space-y-2">
                  <Label className="text-sm font-medium text-gray-700">
                    都道府県 <span className="text-red-500 text-xs">※必須項目</span>
                  </Label>
                  <Select
                    value={prefecture}
                    onValueChange={(value) => {
                      setPrefecture(value);
                      setPrefectureError(value === "" ? "都道府県を選択してください" : "");
                    }}
                  >
                    <SelectTrigger className="rounded border-gray-300 focus:border-teal-500 focus:ring-teal-500 w-48 h-[44px] py-3">
                      <SelectValue placeholder="選択してください" />
                    </SelectTrigger>
                    <SelectContent>
                      {prefectures.map((pref) => (
                        <SelectItem key={pref} value={pref}>
                          {pref}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  {prefectureError && <p className="text-red-500 text-xs">{prefectureError}</p>}
                </div>

                 <div className="space-y-2">
                  <Label className="text-sm font-medium text-gray-700">
                    市区町村 <span className="text-red-500 text-xs">※必須項目</span>
                  </Label>
                  <Input
                    id="cityWard"
                    value={cityWard}
                    onChange={(e) => {
                      setCityWard(e.target.value);
                      const value = e.target.value;
                      setCityWardError(value.trim() === "" ? "市区町村は必須です" : "");
                    }}
                    className="rounded border-gray-300 focus:border-teal-500 focus:ring-teal-500 w-[95%] max-w-md h-[44px] py-3"
                  />
                  {cityWardError && <p className="text-red-500 text-xs">{cityWardError}</p>}
                </div>

                 <div className="space-y-2">
                  <Label className="text-sm font-medium text-gray-700">
                    番地 <span className="text-red-500 text-xs">※必須項目</span>
                  </Label>
                  <Input
                    id="building"
                    value={building}
                    onChange={(e) => {
                      setBuilding(e.target.value);
                      const value = e.target.value;
                      setBuildingError(value.trim() === "" ? "番地は必須です" : "");
                    }}
                    className="rounded border-gray-300 focus:border-teal-500 focus:ring-teal-500 w-[95%] max-w-md h-[44px] py-3"
                  />
                  {buildingError && <p className="text-red-500 text-xs">{buildingError}</p>}
                </div>

                 <div className="space-y-2">
                  <Label className="text-sm font-medium text-gray-700">建物名・部屋番号</Label>
                  <Input
                    id="buildingDetail"
                    value={buildingDetail}
                    onChange={(e) => setBuildingDetail(e.target.value)}
                    className="rounded border-gray-300 focus:border-teal-500 focus:ring-teal-500 w-[95%] max-w-md h-[44px] py-3"
                  />
                </div>

                 {/* Agency Information */}
                <div className="mt-10">
                  <h4 className="mt-3 mb-10 text-gray-700 text-center text-3xl font-semibold">代理店情報入力</h4>

                   <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <Label className="text-sm font-medium text-gray-700">
                        契約担当者名 <span className="text-red-500 text-xs">※必須項目</span>
                      </Label>
                      <p className="text-xs text-gray-500">氏名を続けて入力してください</p>
                      <Input
                        id="agencyRepName"
                        value={agencyRepName}
                        onChange={(e) => {
                          setAgencyRepName(e.target.value);
                          const value = e.target.value;
                          setAgencyRepNameError(value.trim() === "" ? "契約担当者名は必須です" : "");
                        }}
                        className="rounded border-gray-300 focus:border-teal-500 focus:ring-teal-500 w-[95%] max-w-md h-[44px] py-3"
                      />
                      {agencyRepNameError && <p className="text-red-500 text-xs">{agencyRepNameError}</p>}
                    </div>

                     <div className="space-y-2">
                      <Label className="text-sm font-medium text-gray-700">
                        契約担当者名（フリガナ） <span className="text-red-500 text-xs">※必須項目</span>
                      </Label>
                      <p className="text-xs text-gray-500">姓（カタカナ）と名（カタカナ）を続けて入力してください</p>
                      <Input
                        id="agencyRepNameKana"
                        value={agencyRepNameKana}
                        onChange={(e) => {
                          setAgencyRepNameKana(e.target.value);
                          const value = e.target.value;
                          if (value.trim() === "") setAgencyRepNameKanaError("契約担当者名（フリガナ）は必須です");
                          else if (!/^[ァ-ヶー\s]+$/.test(value)) setAgencyRepNameKanaError("カタカナで入力してください");
                          else setAgencyRepNameKanaError("");
                        }}
                        className="rounded border-gray-300 focus:border-teal-500 focus:ring-teal-500 w-[95%] max-w-md h-[44px] py-3"
                      />
                      {agencyRepNameKanaError && <p className="text-red-500 text-xs">{agencyRepNameKanaError}</p>}
                    </div>
                  </div>

                   <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
                    <div className="space-y-2">
                      <Label className="text-sm font-medium text-gray-700">
                        担当代理店名 <span className="text-red-500 text-xs">※必須項目</span>
                      </Label>
                      <Input
                        id="agencyName"
                        value={agencyName}
                        onChange={(e) => {
                          setAgencyName(e.target.value);
                          const value = e.target.value;
                          setAgencyNameError(value.trim() === "" ? "担当代理店名は必須です" : "");
                        }}
                        className="rounded border-gray-300 focus:border-teal-500 focus:ring-teal-500 w-[95%] max-w-md h-[44px] py-3"
                      />
                      {agencyNameError && <p className="text-red-500 text-xs">{agencyNameError}</p>}
                    </div>

                     <div className="space-y-2">
                      <Label className="text-sm font-medium text-gray-700">
                        担当代理店コード <span className="text-red-500 text-xs">※必須項目</span>
                      </Label>
                      <Input
                        id="agencyCode"
                        value={agencyCode}
                        onChange={(e) => {
                          setAgencyCode(e.target.value);
                          const value = e.target.value;
                          setAgencyCodeError(value.trim() === "" ? "担当代理店コードは必須です" : "");
                        }}
                        className="rounded border-gray-300 focus:border-teal-500 focus:ring-teal-500 w-[95%] max-w-md h-[44px] py-3"
                      />
                      {agencyCodeError && <p className="text-red-500 text-xs">{agencyCodeError}</p>}
                    </div>
                  </div>
                </div>
              </div>
            )}

             {/* Other steps placeholder */}
            {derivedStep > 0 && (
              <div className="text-center py-16">
                <h3 className="text-xl font-bold mb-4">{steps[derivedStep]}</h3>
                <p className="text-gray-600">{steps[derivedStep]}の内容がここに表示されます</p>
              </div>
            )}
          </div>

           {/* Navigation Buttons */}
            <div className="flex items-center justify-center space-x-4 mt-8">
              <Link href="/plan">
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

              // <Link href="/" passHref>
              //   <Button
              //     className="rounded-md px-8 py-6 bg-gray-500 text-white text-md font-semibold hover:bg-gray-300 disabled:opacity-50">
              //     戻る
              //   </Button>
              // </Link>