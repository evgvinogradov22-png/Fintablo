import React, { useState, useEffect } from 'react';
import { Check, ChevronLeft, ChevronRight, Plus, Trash2, Users, ArrowDownLeft, ArrowUpRight, CreditCard, TrendingUp, List, Lock, LogOut } from 'lucide-react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, ReferenceLine } from 'recharts';
import storage from './storage';

const STORAGE_KEY = 'budget-system-v8';
const AUTH_KEY = 'budget-auth';
const PASSWORD = '1122';
const MONTHS_SHORT = ['янв', 'фев', 'мар', 'апр', 'май', 'июн', 'июл', 'авг', 'сен', 'окт', 'ноя', 'дек'];
const MONTHS = ['Январь', 'Февраль', 'Март', 'Апрель', 'Май', 'Июнь', 'Июль', 'Август', 'Сентябрь', 'Октябрь', 'Ноябрь', 'Декабрь'];

// Компонент авторизации
function LoginScreen({ onLogin }) {
  const [password, setPassword] = useState('');
  const [error, setError] = useState(false);
  const [shake, setShake] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (password === PASSWORD) {
      try {
        await storage.set(AUTH_KEY, 'true');
      } catch (e) {}
      onLogin();
    } else {
      setError(true);
      setShake(true);
      setTimeout(() => setShake(false), 500);
      setPassword('');
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 flex items-center justify-center p-4">
      <div className={`bg-white rounded-2xl shadow-2xl p-8 w-full max-w-sm ${shake ? 'animate-shake' : ''}`}>
        <div className="flex justify-center mb-6">
          <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-violet-600 rounded-2xl flex items-center justify-center shadow-lg">
            <Lock size={32} className="text-white" />
          </div>
        </div>
        <h1 className="text-2xl font-bold text-center text-slate-800 mb-2">Бюджет</h1>
        <p className="text-sm text-center text-slate-500 mb-6">Введите пароль для входа</p>
        
        <form onSubmit={handleSubmit}>
          <input
            type="password"
            value={password}
            onChange={(e) => { setPassword(e.target.value); setError(false); }}
            placeholder="••••"
            className={`w-full text-center text-2xl tracking-widest px-4 py-4 rounded-xl border-2 focus:outline-none transition-all mb-4 ${
              error ? 'border-red-400 bg-red-50' : 'border-slate-200 focus:border-blue-500'
            }`}
            autoFocus
          />
          {error && <p className="text-red-500 text-sm text-center mb-4">Неверный пароль</p>}
          <button
            type="submit"
            className="w-full py-3 bg-gradient-to-r from-blue-500 to-violet-600 text-white font-medium rounded-xl hover:opacity-90 transition-opacity"
          >
            Войти
          </button>
        </form>
      </div>
      <style>{`
        @keyframes shake {
          0%, 100% { transform: translateX(0); }
          25% { transform: translateX(-10px); }
          75% { transform: translateX(10px); }
        }
        .animate-shake { animation: shake 0.3s ease-in-out; }
      `}</style>
    </div>
  );
}

const defaultData = {
  accounts: [
    { id: 1, name: 'Бизнес', balance: 190000 },
    { id: 2, name: 'Наличка', balance: 0 },
    { id: 3, name: 'Озон', balance: 22000 },
    { id: 4, name: 'Альфа', balance: 0 },
    { id: 5, name: 'Тбанк', balance: 0 },
    { id: 6, name: 'Сбер', balance: 0 },
  ],
  employees: [
    { id: 1, name: 'Саша', pay1: 14825, pay2: 14825 },
    { id: 2, name: 'Вадим', pay1: 35100, pay2: 35100 },
    { id: 3, name: 'Настя', pay1: 16200, pay2: 16200 },
    { id: 4, name: 'Марина', pay1: 15300, pay2: 15300 },
    { id: 5, name: 'Ксюша', pay1: 15000, pay2: 15000 },
    { id: 6, name: 'Миша', pay1: 2850, pay2: 2850 },
    { id: 7, name: 'Дима', pay1: 7200, pay2: 7200 },
  ],
  fotSettings: { payDay1: 5, payDay2: 20 },
  credits: [
    { id: 1, name: 'Альфа кредитка', totalDebt: 150000, monthlyPayment: 10000, day: 12 },
    { id: 2, name: 'Альфа Бизнес Кредит', totalDebt: 500000, monthlyPayment: 37000, day: 15 },
    { id: 3, name: 'Ипотека', totalDebt: 5000000, monthlyPayment: 72000, day: 20 },
    { id: 4, name: 'Квартира', totalDebt: 2000000, monthlyPayment: 104000, day: 22 },
    { id: 5, name: 'Сбер кредит', totalDebt: 100000, monthlyPayment: 5600, day: 24 },
    { id: 6, name: 'Сбер Кредитка', totalDebt: 200000, monthlyPayment: 11000, day: 30 },
    { id: 7, name: 'Альфа кредит', totalDebt: 300000, monthlyPayment: 19400, day: 30 },
  ],
  // ДДС - движение денежных средств (выполненные операции)
  dds: {},
  months: {
    '2026-03': {
      income: [
        { id: 1, name: 'Алексей Филатов', amount: 260000, day: 5 },
        { id: 2, name: 'Доктор Михайлова', amount: 90000, day: 10 },
        { id: 3, name: 'Андрей Гострый', amount: 100000, day: 10 },
        { id: 4, name: 'Зоя Машакова', amount: 50000, day: 15 },
        { id: 5, name: 'Нутри Крис', amount: 20000, day: 20 },
        { id: 6, name: 'ФОТ 1 часть', amount: 150000, day: 1 },
        { id: 7, name: 'ФОТ 2 часть', amount: 150000, day: 15 },
        { id: 8, name: 'Виолетта', amount: 30000, day: 12 },
        { id: 9, name: 'ФПСП', amount: 500000, day: 25 },
      ],
      expenses: [
        { id: 1, name: 'Питание', amount: 80000, day: 1 },
        { id: 2, name: 'Бассейн Теодор', amount: 15600, day: 1 },
        { id: 3, name: 'Развивашки Теодор', amount: 9000, day: 5 },
      ],
      debts: [
        { id: 1, name: 'Женек', amount: 21000, day: 28 },
        { id: 2, name: 'Дядя Миша', amount: 10000, day: 15 },
      ],
    },
  },
};

export default function BudgetSystem() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [authChecked, setAuthChecked] = useState(false);
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [selectedMonth, setSelectedMonth] = useState('2026-03');
  const [tab, setTab] = useState('budget');

  useEffect(() => { 
    checkAuth();
  }, []);

  const checkAuth = async () => {
    try {
      const result = await storage.get(AUTH_KEY);
      if (result?.value === 'true') {
        setIsAuthenticated(true);
        loadData();
      }
    } catch (e) {}
    setAuthChecked(true);
  };

  const handleLogin = () => {
    setIsAuthenticated(true);
    loadData();
  };

  const handleLogout = async () => {
    try {
      await storage.delete(AUTH_KEY);
    } catch (e) {}
    setIsAuthenticated(false);
    setData(null);
  };

  const loadData = async () => {
    try {
      const result = await storage.get(STORAGE_KEY);
      if (result?.value) {
        setData(JSON.parse(result.value));
      } else {
        setData(defaultData);
        await storage.set(STORAGE_KEY, JSON.stringify(defaultData));
      }
    } catch (e) { setData(defaultData); }
    setLoading(false);
  };

  const save = async (newData) => {
    setData(newData);
    try { await storage.set(STORAGE_KEY, JSON.stringify(newData)); } catch (e) {}
  };

  const fmt = (n) => new Intl.NumberFormat('ru-RU').format(n) + ' ₽';
  const fmtShort = (n) => new Intl.NumberFormat('ru-RU').format(n);

  const parseMonthKey = (key) => {
    const [y, m] = key.split('-').map(Number);
    return { year: y, month: m };
  };

  const getPrevMonthKey = (key) => {
    const { year, month } = parseMonthKey(key);
    const d = new Date(year, month - 2, 1);
    return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}`;
  };

  const getMonthData = () => data.months[selectedMonth] || { income: [], expenses: [], debts: [] };
  const getDDS = () => data.dds[selectedMonth] || [];
  
  const ensureMonth = (key) => {
    if (!data.months[key]) {
      const newData = JSON.parse(JSON.stringify(data));
      newData.months[key] = { income: [], expenses: [], debts: [] };
      save(newData);
      return newData;
    }
    return data;
  };

  const changeMonth = (dir) => {
    const { year, month } = parseMonthKey(selectedMonth);
    const d = new Date(year, month - 1 + dir, 1);
    const key = `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}`;
    ensureMonth(key);
    setSelectedMonth(key);
  };

  // Отметить как выполненное — переносит в ДДС
  const markDone = (type, item, extra = {}) => {
    const newData = JSON.parse(JSON.stringify(data));
    if (!newData.dds[selectedMonth]) newData.dds[selectedMonth] = [];
    
    const ddsEntry = {
      id: Date.now(),
      date: new Date().toISOString(),
      day: item.day || extra.day,
      type,
      name: item.name || extra.name,
      amount: item.amount || extra.amount,
      ...extra
    };
    newData.dds[selectedMonth].push(ddsEntry);
    
    // Удаляем из плана
    if (type === 'income' || type === 'expense' || type === 'debt') {
      const listType = type === 'expense' ? 'expenses' : type === 'debt' ? 'debts' : 'income';
      newData.months[selectedMonth][listType] = newData.months[selectedMonth][listType].filter(i => i.id !== item.id);
    }
    
    save(newData);
  };

  const markEmployeeDone = (emp, payNum) => {
    const newData = JSON.parse(JSON.stringify(data));
    if (!newData.dds[selectedMonth]) newData.dds[selectedMonth] = [];
    
    const day = payNum === 1 ? data.fotSettings.payDay1 : data.fotSettings.payDay2;
    const amount = payNum === 1 ? emp.pay1 : emp.pay2;
    
    newData.dds[selectedMonth].push({
      id: Date.now(),
      date: new Date().toISOString(),
      day,
      type: 'salary',
      name: `${emp.name} (выплата ${payNum})`,
      amount,
      employeeId: emp.id,
      payNum
    });
    
    save(newData);
  };

  const markCreditDone = (credit) => {
    const newData = JSON.parse(JSON.stringify(data));
    if (!newData.dds[selectedMonth]) newData.dds[selectedMonth] = [];
    
    newData.dds[selectedMonth].push({
      id: Date.now(),
      date: new Date().toISOString(),
      day: credit.day,
      type: 'credit',
      name: credit.name,
      amount: credit.monthlyPayment,
      creditId: credit.id
    });
    
    save(newData);
  };

  const removeDDS = (id) => {
    const newData = JSON.parse(JSON.stringify(data));
    newData.dds[selectedMonth] = newData.dds[selectedMonth].filter(d => d.id !== id);
    save(newData);
  };

  const add = (type) => {
    const current = ensureMonth(selectedMonth);
    const newData = JSON.parse(JSON.stringify(current));
    if (!newData.months[selectedMonth]) newData.months[selectedMonth] = { income: [], expenses: [], debts: [] };
    if (!newData.months[selectedMonth][type]) newData.months[selectedMonth][type] = [];
    newData.months[selectedMonth][type].push({ id: Date.now(), name: '', amount: 0, day: 1 });
    save(newData);
  };

  const remove = (type, id) => {
    const newData = JSON.parse(JSON.stringify(data));
    newData.months[selectedMonth][type] = newData.months[selectedMonth][type].filter(i => i.id !== id);
    save(newData);
  };

  const update = (type, id, field, value) => {
    const newData = JSON.parse(JSON.stringify(data));
    const item = newData.months[selectedMonth][type].find(i => i.id === id);
    if (item) item[field] = field === 'name' ? value : Number(value);
    save(newData);
  };

  const updateAccount = (id, balance) => {
    const newData = JSON.parse(JSON.stringify(data));
    const acc = newData.accounts.find(a => a.id === id);
    if (acc) acc.balance = Number(balance);
    save(newData);
  };

  const addEmployee = () => {
    const newData = JSON.parse(JSON.stringify(data));
    newData.employees.push({ id: Date.now(), name: '', pay1: 0, pay2: 0 });
    save(newData);
  };

  const updateEmployee = (id, field, value) => {
    const newData = JSON.parse(JSON.stringify(data));
    const emp = newData.employees.find(e => e.id === id);
    if (emp) emp[field] = field === 'name' ? value : Number(value);
    save(newData);
  };

  const removeEmployee = (id) => {
    const newData = JSON.parse(JSON.stringify(data));
    newData.employees = newData.employees.filter(e => e.id !== id);
    save(newData);
  };

  const updateFotSettings = (field, value) => {
    const newData = JSON.parse(JSON.stringify(data));
    newData.fotSettings[field] = Number(value);
    save(newData);
  };

  const addCredit = () => {
    const newData = JSON.parse(JSON.stringify(data));
    newData.credits.push({ id: Date.now(), name: '', totalDebt: 0, monthlyPayment: 0, day: 1 });
    save(newData);
  };

  const updateCredit = (id, field, value) => {
    const newData = JSON.parse(JSON.stringify(data));
    const credit = newData.credits.find(c => c.id === id);
    if (credit) credit[field] = field === 'name' ? value : Number(value);
    save(newData);
  };

  const removeCredit = (id) => {
    const newData = JSON.parse(JSON.stringify(data));
    newData.credits = newData.credits.filter(c => c.id !== id);
    save(newData);
  };

  if (!authChecked) return <div className="min-h-screen bg-neutral-50 flex items-center justify-center text-neutral-400">Загрузка...</div>;
  
  if (!isAuthenticated) return <LoginScreen onLogin={handleLogin} />;

  if (loading || !data) return <div className="min-h-screen bg-neutral-50 flex items-center justify-center text-neutral-400">Загрузка данных...</div>;

  const md = getMonthData();
  const dds = getDDS();
  const { year, month } = parseMonthKey(selectedMonth);
  const monthName = `${MONTHS[month - 1]} ${year}`;
  
  const totalBalance = data.accounts.reduce((s, a) => s + a.balance, 0);
  const totalPay1 = data.employees.reduce((s, e) => s + e.pay1, 0);
  const totalPay2 = data.employees.reduce((s, e) => s + e.pay2, 0);
  const totalSalary = totalPay1 + totalPay2;
  const totalCreditsDebt = data.credits.reduce((s, c) => s + c.totalDebt, 0);
  const totalCreditsMonthly = data.credits.reduce((s, c) => s + c.monthlyPayment, 0);

  // Проверяем что уже в ДДС
  const isEmployeePaid = (empId, payNum) => dds.some(d => d.type === 'salary' && d.employeeId === empId && d.payNum === payNum);
  const isCreditPaid = (creditId) => dds.some(d => d.type === 'credit' && d.creditId === creditId);

  // Суммы из ДДС
  const ddsIncome = dds.filter(d => d.type === 'income').reduce((s, d) => s + d.amount, 0);
  const ddsExpenses = dds.filter(d => d.type === 'expense').reduce((s, d) => s + d.amount, 0);
  const ddsSalary = dds.filter(d => d.type === 'salary').reduce((s, d) => s + d.amount, 0);
  const ddsCredits = dds.filter(d => d.type === 'credit').reduce((s, d) => s + d.amount, 0);
  const ddsDebts = dds.filter(d => d.type === 'debt').reduce((s, d) => s + d.amount, 0);

  // План (что осталось)
  const planIncome = (md.income || []).reduce((s, i) => s + i.amount, 0);
  const planExpenses = (md.expenses || []).reduce((s, i) => s + i.amount, 0);
  const planDebts = (md.debts || []).reduce((s, i) => s + i.amount, 0);
  const planSalary = totalSalary - ddsSalary;
  const planCredits = totalCreditsMonthly - ddsCredits;

  const totalIncome = planIncome + ddsIncome;
  const totalOut = planExpenses + ddsExpenses + totalSalary + totalCreditsMonthly + planDebts + ddsDebts;
  
  const prevMonthKey = getPrevMonthKey(selectedMonth);
  const prevDDS = data.dds[prevMonthKey] || [];
  const prevIncome = prevDDS.filter(d => d.type === 'income').reduce((s, d) => s + d.amount, 0);
  const prevOut = prevDDS.filter(d => ['expense', 'salary', 'credit', 'debt'].includes(d.type)).reduce((s, d) => s + d.amount, 0);
  const prevBalance = totalBalance; // Упрощённо
  const endBalance = prevBalance + totalIncome - totalOut;

  // Chart data
  const daysInMonth = new Date(year, month, 0).getDate();
  const chartData = [];
  let cumBalance = prevBalance;

  for (let d = 1; d <= daysInMonth; d++) {
    const dayIncome = (md.income || []).filter(i => i.day === d).reduce((s, i) => s + i.amount, 0) +
                      dds.filter(i => i.type === 'income' && i.day === d).reduce((s, i) => s + i.amount, 0);
    const dayExpense = (md.expenses || []).filter(i => i.day === d).reduce((s, i) => s + i.amount, 0) +
                       dds.filter(i => i.type === 'expense' && i.day === d).reduce((s, i) => s + i.amount, 0);
    const dayDebts = (md.debts || []).filter(i => i.day === d).reduce((s, i) => s + i.amount, 0) +
                     dds.filter(i => i.type === 'debt' && i.day === d).reduce((s, i) => s + i.amount, 0);
    const dayCredits = data.credits.filter(c => c.day === d).reduce((s, c) => s + c.monthlyPayment, 0);
    const daySalary = (d === data.fotSettings.payDay1 ? totalPay1 : 0) + (d === data.fotSettings.payDay2 ? totalPay2 : 0);
    
    cumBalance += dayIncome - dayExpense - dayDebts - dayCredits - daySalary;
    chartData.push({ day: d, balance: cumBalance });
  }

  const firstDay = (new Date(year, month - 1, 1).getDay() + 6) % 7;

  const getAllItemsForDay = (day) => {
    const items = [];
    (md.income || []).filter(i => i.day === day).forEach(i => items.push({ ...i, type: 'income' }));
    (md.expenses || []).filter(i => i.day === day).forEach(i => items.push({ ...i, type: 'expense' }));
    (md.debts || []).filter(i => i.day === day).forEach(i => items.push({ ...i, type: 'debt' }));
    data.credits.filter(c => c.day === day && !isCreditPaid(c.id)).forEach(c => items.push({ name: c.name, amount: c.monthlyPayment, type: 'credit' }));
    if (day === data.fotSettings.payDay1 && data.employees.some(e => !isEmployeePaid(e.id, 1))) items.push({ name: 'ФОТ (1)', amount: totalPay1, type: 'fot' });
    if (day === data.fotSettings.payDay2 && data.employees.some(e => !isEmployeePaid(e.id, 2))) items.push({ name: 'ФОТ (2)', amount: totalPay2, type: 'fot' });
    dds.filter(d => d.day === day).forEach(d => items.push({ ...d, done: true }));
    return items;
  };

  const Row = ({ item, type, onDone, onUpdate, onRemove, color }) => (
    <div className="flex items-center gap-2 py-2.5 border-b border-neutral-100 last:border-0 group">
      <button onClick={onDone} className="w-5 h-5 rounded border-2 border-neutral-300 hover:border-emerald-400 hover:bg-emerald-50 flex items-center justify-center transition-all flex-shrink-0">
        <Check size={12} className="text-neutral-300 group-hover:text-emerald-500" />
      </button>
      <div className="w-16 flex-shrink-0">
        <input type="number" value={item.day} onChange={(e) => onUpdate('day', e.target.value)} className="w-8 text-center text-sm bg-neutral-100 rounded px-1 py-0.5 text-neutral-600 focus:outline-none" min="1" max="31" />
        <span className="text-xs text-neutral-400 ml-1">{MONTHS_SHORT[month - 1]}</span>
      </div>
      <input type="text" value={item.name} onChange={(e) => onUpdate('name', e.target.value)} placeholder="Название" className="flex-1 bg-transparent focus:outline-none min-w-0 text-neutral-700" />
      <input type="number" value={item.amount} onChange={(e) => onUpdate('amount', e.target.value)} className={`w-28 text-right bg-transparent focus:outline-none font-medium flex-shrink-0 ${color}`} />
      <button onClick={onRemove} className="text-neutral-200 group-hover:text-neutral-400 hover:!text-red-400 transition-colors p-1 flex-shrink-0">
        <Trash2 size={14} />
      </button>
    </div>
  );

  const Section = ({ title, icon: Icon, items, type, bgColor, iconColor, textColor, isIncome }) => {
    const total = items.reduce((s, i) => s + i.amount, 0);
    return (
      <div className="bg-white rounded-xl border border-neutral-200 overflow-hidden">
        <div className="flex items-center justify-between px-4 py-3 bg-neutral-50 border-b border-neutral-100">
          <div className="flex items-center gap-2">
            <div className={`w-6 h-6 rounded-md ${bgColor} flex items-center justify-center`}><Icon size={14} className={iconColor} /></div>
            <span className="font-medium text-neutral-700">{title}</span>
          </div>
          <span className={`text-sm font-medium ${textColor}`}>{fmt(total)}</span>
        </div>
        <div className="px-4 py-1">
          {items.sort((a, b) => a.day - b.day).map(item => (
            <Row key={item.id} item={item} type={type} color={textColor}
              onDone={() => markDone(type, item)}
              onUpdate={(field, value) => update(type, item.id, field, value)}
              onRemove={() => remove(type, item.id)}
            />
          ))}
          <button onClick={() => add(type)} className="flex items-center gap-1 text-sm text-neutral-400 hover:text-neutral-600 py-2.5 transition-colors w-full">
            <Plus size={14} /> Добавить
          </button>
        </div>
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-neutral-50" style={{ fontFamily: "-apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif" }}>
      <header className="bg-white border-b border-neutral-200 sticky top-0 z-50">
        <div className="max-w-4xl mx-auto px-4 py-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <button onClick={() => changeMonth(-1)} className="p-1.5 hover:bg-neutral-100 rounded-lg transition-colors"><ChevronLeft size={20} className="text-neutral-400" /></button>
              <h1 className="text-lg font-semibold text-neutral-800 min-w-[150px] text-center">{monthName}</h1>
              <button onClick={() => changeMonth(1)} className="p-1.5 hover:bg-neutral-100 rounded-lg transition-colors"><ChevronRight size={20} className="text-neutral-400" /></button>
            </div>
            <div className="flex items-center gap-2">
              <div className="flex items-center gap-1 bg-neutral-100 rounded-lg p-1">
                {[
                  { id: 'budget', label: 'Бюджет' },
                  { id: 'employees', label: 'Сотрудники' },
                  { id: 'credits', label: 'Кредиты' },
                  { id: 'dds', label: 'ДДС' },
                  { id: 'calendar', label: 'Календарь' },
                ].map(t => (
                  <button key={t.id} onClick={() => setTab(t.id)} className={`px-3 py-1.5 rounded-md text-sm transition-all ${tab === t.id ? 'bg-white text-neutral-800 shadow-sm font-medium' : 'text-neutral-500 hover:text-neutral-700'}`}>
                    {t.label}
                    {t.id === 'dds' && dds.length > 0 && <span className="ml-1 text-xs bg-emerald-500 text-white px-1.5 rounded-full">{dds.length}</span>}
                  </button>
                ))}
              </div>
              <button onClick={handleLogout} className="p-2 hover:bg-red-50 rounded-lg transition-colors group" title="Выйти">
                <LogOut size={18} className="text-neutral-400 group-hover:text-red-500" />
              </button>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-4xl mx-auto px-4 py-6">
        {/* Финансовое состояние — всегда сверху */}
        <div className="bg-white rounded-xl border border-neutral-200 overflow-hidden mb-6">
          <div className="flex items-center gap-2 px-4 py-3 bg-neutral-50 border-b border-neutral-100">
            <div className="w-6 h-6 rounded-md bg-blue-100 flex items-center justify-center"><TrendingUp size={14} className="text-blue-600" /></div>
            <span className="font-medium text-neutral-700">Финансовое состояние</span>
          </div>
          <div className="p-4">
            <div className="grid grid-cols-4 gap-4 mb-4">
              <div className="text-center">
                <div className="text-xs text-neutral-400 mb-1">Начало</div>
                <div className={`text-lg font-semibold ${prevBalance >= 0 ? 'text-neutral-700' : 'text-red-500'}`}>{fmtShort(prevBalance)}</div>
              </div>
              <div className="text-center">
                <div className="text-xs text-neutral-400 mb-1">Приходы</div>
                <div className="text-lg font-semibold text-emerald-600">+{fmtShort(totalIncome)}</div>
              </div>
              <div className="text-center">
                <div className="text-xs text-neutral-400 mb-1">Расходы</div>
                <div className="text-lg font-semibold text-rose-600">−{fmtShort(totalOut)}</div>
              </div>
              <div className="text-center">
                <div className="text-xs text-neutral-400 mb-1">Конец</div>
                <div className={`text-lg font-semibold ${endBalance >= 0 ? 'text-blue-600' : 'text-red-500'}`}>{fmtShort(endBalance)}</div>
              </div>
            </div>
            <div className="h-40">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={chartData} margin={{ top: 5, right: 5, left: 5, bottom: 5 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#e5e5e5" />
                  <XAxis dataKey="day" tick={{ fontSize: 10 }} stroke="#a3a3a3" />
                  <YAxis tick={{ fontSize: 10 }} stroke="#a3a3a3" tickFormatter={v => `${Math.round(v/1000)}K`} />
                  <Tooltip formatter={(v) => fmt(v)} labelFormatter={(d) => `${d} ${MONTHS_SHORT[month-1]}`} />
                  <ReferenceLine y={0} stroke="#ef4444" strokeDasharray="3 3" />
                  <Line type="monotone" dataKey="balance" stroke="#3b82f6" strokeWidth={2} dot={false} name="Баланс" />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>

        {/* Счета */}
        <div className="bg-white rounded-xl border border-neutral-200 p-4 mb-6">
          <div className="flex items-center justify-between mb-3">
            <span className="text-sm font-medium text-neutral-500">Счета</span>
            <span className={`text-lg font-semibold ${totalBalance >= 0 ? 'text-neutral-800' : 'text-red-500'}`}>{fmt(totalBalance)}</span>
          </div>
          <div className="grid grid-cols-3 md:grid-cols-6 gap-2">
            {data.accounts.map(acc => (
              <div key={acc.id} className="bg-neutral-50 rounded-lg p-2.5">
                <div className="text-xs text-neutral-400 mb-1">{acc.name}</div>
                <input type="number" value={acc.balance} onChange={(e) => updateAccount(acc.id, e.target.value)} className={`w-full bg-transparent text-sm font-semibold focus:outline-none ${acc.balance >= 0 ? 'text-neutral-700' : 'text-red-500'}`} />
              </div>
            ))}
          </div>
        </div>

        {tab === 'budget' && (
          <div className="space-y-4">
            <Section title="Приходы" icon={ArrowDownLeft} items={md.income || []} type="income" bgColor="bg-emerald-100" iconColor="text-emerald-600" textColor="text-emerald-600" isIncome />
            <Section title="Расходы" icon={ArrowUpRight} items={md.expenses || []} type="expenses" bgColor="bg-amber-100" iconColor="text-amber-600" textColor="text-amber-600" />
            <Section title="Долги (разовые)" icon={CreditCard} items={md.debts || []} type="debts" bgColor="bg-orange-100" iconColor="text-orange-600" textColor="text-orange-600" />
            
            {/* ФОТ */}
            <div className="bg-white rounded-xl border border-neutral-200 overflow-hidden">
              <div className="flex items-center justify-between px-4 py-3 bg-neutral-50 border-b border-neutral-100">
                <div className="flex items-center gap-2">
                  <div className="w-6 h-6 rounded-md bg-violet-100 flex items-center justify-center"><Users size={14} className="text-violet-600" /></div>
                  <span className="font-medium text-neutral-700">ФОТ</span>
                </div>
                <span className="text-sm font-medium text-violet-600">{fmt(planSalary)}</span>
              </div>
              <div className="px-4 py-2">
                <div className="flex items-center gap-2 py-2 text-sm text-neutral-500">
                  <div className="w-5"></div>
                  <div className="w-16">{data.fotSettings.payDay1} {MONTHS_SHORT[month-1]}</div>
                  <div className="flex-1">Выплата 1</div>
                  <div className="w-24 text-right">{fmt(totalPay1 - dds.filter(d => d.type === 'salary' && d.payNum === 1).reduce((s,d) => s + d.amount, 0))}</div>
                  <div className="w-7"></div>
                </div>
                <div className="flex items-center gap-2 py-2 text-sm text-neutral-500">
                  <div className="w-5"></div>
                  <div className="w-16">{data.fotSettings.payDay2} {MONTHS_SHORT[month-1]}</div>
                  <div className="flex-1">Выплата 2</div>
                  <div className="w-24 text-right">{fmt(totalPay2 - dds.filter(d => d.type === 'salary' && d.payNum === 2).reduce((s,d) => s + d.amount, 0))}</div>
                  <div className="w-7"></div>
                </div>
              </div>
            </div>

            {/* Кредиты */}
            <div className="bg-white rounded-xl border border-neutral-200 overflow-hidden">
              <div className="flex items-center justify-between px-4 py-3 bg-neutral-50 border-b border-neutral-100">
                <div className="flex items-center gap-2">
                  <div className="w-6 h-6 rounded-md bg-rose-100 flex items-center justify-center"><CreditCard size={14} className="text-rose-600" /></div>
                  <span className="font-medium text-neutral-700">Кредиты</span>
                </div>
                <span className="text-sm font-medium text-rose-600">{fmt(planCredits)}</span>
              </div>
              <div className="px-4 py-1">
                {data.credits.filter(c => !isCreditPaid(c.id)).sort((a, b) => a.day - b.day).map(credit => (
                  <div key={credit.id} className="flex items-center gap-2 py-2.5 border-b border-neutral-100 last:border-0 group">
                    <button onClick={() => markCreditDone(credit)} className="w-5 h-5 rounded border-2 border-neutral-300 hover:border-emerald-400 hover:bg-emerald-50 flex items-center justify-center transition-all flex-shrink-0">
                      <Check size={12} className="text-neutral-300 group-hover:text-emerald-500" />
                    </button>
                    <div className="w-16 flex-shrink-0">
                      <span className="text-sm text-neutral-600">{String(credit.day).padStart(2, '0')}</span>
                      <span className="text-xs text-neutral-400 ml-1">{MONTHS_SHORT[month - 1]}</span>
                    </div>
                    <span className="flex-1 text-neutral-700">{credit.name}</span>
                    <span className="w-28 text-right font-medium text-rose-600">{fmt(credit.monthlyPayment)}</span>
                    <div className="w-7"></div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {tab === 'employees' && (
          <div className="space-y-4">
            <div className="bg-white rounded-xl border border-neutral-200 p-4">
              <div className="flex items-center gap-2 mb-3">
                <Users size={18} className="text-violet-500" />
                <span className="font-medium text-neutral-700">Даты выплат</span>
              </div>
              <div className="flex gap-4">
                {[1, 2].map(num => (
                  <div key={num} className="flex items-center gap-2">
                    <span className="text-sm text-neutral-500">Выплата {num}:</span>
                    <input type="number" value={data.fotSettings[`payDay${num}`]} onChange={(e) => updateFotSettings(`payDay${num}`, e.target.value)} className="w-14 text-center bg-neutral-100 rounded-lg px-2 py-1.5 text-neutral-700 font-medium focus:outline-none" min="1" max="31" />
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-white rounded-xl border border-neutral-200 overflow-hidden">
              <div className="grid grid-cols-12 gap-2 px-4 py-3 bg-neutral-50 border-b border-neutral-100 text-sm font-medium text-neutral-500">
                <div className="col-span-4">Сотрудник</div>
                <div className="col-span-3 text-center">Выплата 1 ({data.fotSettings.payDay1})</div>
                <div className="col-span-3 text-center">Выплата 2 ({data.fotSettings.payDay2})</div>
                <div className="col-span-2 text-right">Итого</div>
              </div>
              <div className="divide-y divide-neutral-100">
                {data.employees.map(emp => {
                  const paid1 = isEmployeePaid(emp.id, 1);
                  const paid2 = isEmployeePaid(emp.id, 2);
                  return (
                    <div key={emp.id} className="grid grid-cols-12 gap-2 px-4 py-3 items-center group">
                      <div className="col-span-4">
                        <input type="text" value={emp.name} onChange={(e) => updateEmployee(emp.id, 'name', e.target.value)} placeholder="Имя" className="w-full bg-transparent text-neutral-700 focus:outline-none" />
                      </div>
                      <div className="col-span-3 flex items-center justify-center gap-2">
                        <input type="number" value={emp.pay1} onChange={(e) => updateEmployee(emp.id, 'pay1', e.target.value)} className={`w-20 text-right bg-neutral-50 rounded px-2 py-1 font-medium focus:outline-none ${paid1 ? 'text-neutral-300 line-through' : 'text-violet-600'}`} />
                        <button onClick={() => !paid1 && markEmployeeDone(emp, 1)} disabled={paid1} className={`w-6 h-6 rounded flex items-center justify-center transition-all ${paid1 ? 'bg-emerald-500 cursor-default' : 'border-2 border-neutral-300 hover:border-emerald-400 hover:bg-emerald-50'}`}>
                          <Check size={12} className={paid1 ? 'text-white' : 'text-neutral-300'} />
                        </button>
                      </div>
                      <div className="col-span-3 flex items-center justify-center gap-2">
                        <input type="number" value={emp.pay2} onChange={(e) => updateEmployee(emp.id, 'pay2', e.target.value)} className={`w-20 text-right bg-neutral-50 rounded px-2 py-1 font-medium focus:outline-none ${paid2 ? 'text-neutral-300 line-through' : 'text-violet-600'}`} />
                        <button onClick={() => !paid2 && markEmployeeDone(emp, 2)} disabled={paid2} className={`w-6 h-6 rounded flex items-center justify-center transition-all ${paid2 ? 'bg-emerald-500 cursor-default' : 'border-2 border-neutral-300 hover:border-emerald-400 hover:bg-emerald-50'}`}>
                          <Check size={12} className={paid2 ? 'text-white' : 'text-neutral-300'} />
                        </button>
                      </div>
                      <div className="col-span-2 text-right font-medium text-neutral-700">{fmt(emp.pay1 + emp.pay2)}</div>
                    </div>
                  );
                })}
              </div>
              <div className="grid grid-cols-12 gap-2 px-4 py-3 bg-neutral-50 border-t border-neutral-100 font-medium">
                <div className="col-span-4 text-neutral-700">Итого</div>
                <div className="col-span-3 text-center text-violet-600">{fmt(totalPay1)}</div>
                <div className="col-span-3 text-center text-violet-600">{fmt(totalPay2)}</div>
                <div className="col-span-2 text-right text-neutral-800">{fmt(totalSalary)}</div>
              </div>
              <div className="p-3 border-t border-neutral-100">
                <button onClick={addEmployee} className="flex items-center gap-1 text-sm text-neutral-400 hover:text-neutral-600 transition-colors">
                  <Plus size={14} /> Добавить сотрудника
                </button>
              </div>
            </div>
          </div>
        )}

        {tab === 'credits' && (
          <div className="space-y-4">
            <div className="bg-rose-50 rounded-xl border border-rose-200 p-4">
              <div className="flex items-center justify-between">
                <div>
                  <div className="text-sm text-rose-600">Общая сумма долга</div>
                  <div className="text-2xl font-bold text-rose-700">{fmt(totalCreditsDebt)}</div>
                </div>
                <div>
                  <div className="text-sm text-rose-600">Ежемесячный платёж</div>
                  <div className="text-2xl font-bold text-rose-700">{fmt(totalCreditsMonthly)}</div>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-xl border border-neutral-200 overflow-hidden">
              <div className="divide-y divide-neutral-100">
                {data.credits.map(credit => (
                  <div key={credit.id} className="p-4 group">
                    <div className="flex items-center gap-3 mb-2">
                      <input type="text" value={credit.name} onChange={(e) => updateCredit(credit.id, 'name', e.target.value)} placeholder="Название" className="flex-1 bg-transparent text-neutral-800 font-medium focus:outline-none" />
                      <button onClick={() => removeCredit(credit.id)} className="text-neutral-200 group-hover:text-neutral-400 hover:!text-red-400 transition-colors p-1"><Trash2 size={16} /></button>
                    </div>
                    <div className="grid grid-cols-3 gap-3">
                      <div>
                        <div className="text-xs text-neutral-400 mb-1">Общий долг</div>
                        <input type="number" value={credit.totalDebt} onChange={(e) => updateCredit(credit.id, 'totalDebt', e.target.value)} className="w-full bg-neutral-50 rounded-lg px-3 py-2 text-neutral-700 font-medium focus:outline-none" />
                      </div>
                      <div>
                        <div className="text-xs text-neutral-400 mb-1">Платёж / мес</div>
                        <input type="number" value={credit.monthlyPayment} onChange={(e) => updateCredit(credit.id, 'monthlyPayment', e.target.value)} className="w-full bg-neutral-50 rounded-lg px-3 py-2 text-rose-600 font-medium focus:outline-none" />
                      </div>
                      <div>
                        <div className="text-xs text-neutral-400 mb-1">День платежа</div>
                        <input type="number" value={credit.day} onChange={(e) => updateCredit(credit.id, 'day', e.target.value)} className="w-full bg-neutral-50 rounded-lg px-3 py-2 text-neutral-700 font-medium focus:outline-none" min="1" max="31" />
                      </div>
                    </div>
                  </div>
                ))}
              </div>
              <div className="p-3 border-t border-neutral-100">
                <button onClick={addCredit} className="flex items-center gap-1 text-sm text-neutral-400 hover:text-neutral-600 transition-colors"><Plus size={14} /> Добавить кредит</button>
              </div>
            </div>
          </div>
        )}

        {tab === 'dds' && (
          <div className="space-y-4">
            <div className="bg-emerald-50 rounded-xl border border-emerald-200 p-4">
              <div className="grid grid-cols-4 gap-4 text-center">
                <div>
                  <div className="text-xs text-emerald-600">Приходы</div>
                  <div className="text-xl font-bold text-emerald-700">+{fmtShort(ddsIncome)}</div>
                </div>
                <div>
                  <div className="text-xs text-amber-600">Расходы</div>
                  <div className="text-xl font-bold text-amber-700">−{fmtShort(ddsExpenses + ddsDebts)}</div>
                </div>
                <div>
                  <div className="text-xs text-violet-600">ЗП</div>
                  <div className="text-xl font-bold text-violet-700">−{fmtShort(ddsSalary)}</div>
                </div>
                <div>
                  <div className="text-xs text-rose-600">Кредиты</div>
                  <div className="text-xl font-bold text-rose-700">−{fmtShort(ddsCredits)}</div>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-xl border border-neutral-200 overflow-hidden">
              <div className="px-4 py-3 bg-neutral-50 border-b border-neutral-100 flex items-center gap-2">
                <List size={18} className="text-neutral-500" />
                <span className="font-medium text-neutral-700">Движение денежных средств</span>
                <span className="text-sm text-neutral-400">({dds.length} операций)</span>
              </div>
              {dds.length === 0 ? (
                <div className="p-8 text-center text-neutral-400">
                  Нет выполненных операций.<br />
                  <span className="text-sm">Отмечайте галочками операции в Бюджете, чтобы они появились здесь.</span>
                </div>
              ) : (
                <div className="divide-y divide-neutral-100">
                  {dds.sort((a, b) => a.day - b.day).map(item => (
                    <div key={item.id} className="flex items-center gap-3 px-4 py-3 group">
                      <div className={`w-2 h-2 rounded-full ${
                        item.type === 'income' ? 'bg-emerald-500' :
                        item.type === 'salary' ? 'bg-violet-500' :
                        item.type === 'credit' ? 'bg-rose-500' :
                        'bg-amber-500'
                      }`}></div>
                      <div className="w-12 text-sm text-neutral-500">{item.day} {MONTHS_SHORT[month-1]}</div>
                      <div className="flex-1 text-neutral-700">{item.name}</div>
                      <div className={`font-medium ${item.type === 'income' ? 'text-emerald-600' : 'text-neutral-700'}`}>
                        {item.type === 'income' ? '+' : '−'}{fmt(item.amount)}
                      </div>
                      <button onClick={() => removeDDS(item.id)} className="text-neutral-200 group-hover:text-neutral-400 hover:!text-red-400 transition-colors p-1">
                        <Trash2 size={14} />
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        )}

        {tab === 'calendar' && (
          <div className="bg-white rounded-xl border border-neutral-200 overflow-hidden">
            <div className="grid grid-cols-7 border-b border-neutral-200 bg-neutral-50">
              {['Пн', 'Вт', 'Ср', 'Чт', 'Пт', 'Сб', 'Вс'].map(d => (
                <div key={d} className="text-center text-xs text-neutral-500 py-2 font-medium">{d}</div>
              ))}
            </div>
            <div className="grid grid-cols-7">
              {Array.from({ length: firstDay }, (_, i) => (
                <div key={`e-${i}`} className="aspect-square border-b border-r border-neutral-100 bg-neutral-50/50"></div>
              ))}
              {Array.from({ length: daysInMonth }, (_, i) => {
                const day = i + 1;
                const dayItems = getAllItemsForDay(day);
                return (
                  <div key={day} className="min-h-[100px] border-b border-r border-neutral-100 p-1.5 hover:bg-neutral-50 transition-colors">
                    <div className="text-xs font-medium text-neutral-400 mb-1">{day}</div>
                    <div className="space-y-0.5">
                      {dayItems.slice(0, 5).map((it, idx) => (
                        <div key={idx} className={`text-[10px] leading-tight px-1.5 py-0.5 rounded truncate ${
                          it.done ? 'bg-neutral-100 text-neutral-400 line-through' :
                          it.type === 'income' ? 'bg-emerald-100 text-emerald-700' :
                          it.type === 'fot' || it.type === 'salary' ? 'bg-violet-100 text-violet-700' :
                          it.type === 'credit' ? 'bg-rose-100 text-rose-700' :
                          it.type === 'debt' ? 'bg-orange-100 text-orange-700' :
                          'bg-amber-100 text-amber-700'
                        }`}>{it.name || '—'}</div>
                      ))}
                      {dayItems.length > 5 && <div className="text-[10px] text-neutral-400 pl-1">+{dayItems.length - 5}</div>}
                    </div>
                  </div>
                );
              })}
            </div>
            <div className="flex flex-wrap gap-4 p-3 border-t border-neutral-200 bg-neutral-50">
              <div className="flex items-center gap-1.5 text-xs"><div className="w-2.5 h-2.5 rounded-sm bg-emerald-400"></div><span className="text-neutral-500">Приходы</span></div>
              <div className="flex items-center gap-1.5 text-xs"><div className="w-2.5 h-2.5 rounded-sm bg-violet-400"></div><span className="text-neutral-500">ФОТ</span></div>
              <div className="flex items-center gap-1.5 text-xs"><div className="w-2.5 h-2.5 rounded-sm bg-amber-400"></div><span className="text-neutral-500">Расходы</span></div>
              <div className="flex items-center gap-1.5 text-xs"><div className="w-2.5 h-2.5 rounded-sm bg-rose-400"></div><span className="text-neutral-500">Кредиты</span></div>
              <div className="flex items-center gap-1.5 text-xs"><div className="w-2.5 h-2.5 rounded-sm bg-orange-400"></div><span className="text-neutral-500">Долги</span></div>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}
