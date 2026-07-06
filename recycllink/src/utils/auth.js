// src/utils/auth.js

export const logout = () => {
    // 1. መረጃዎችን ከ localStorage አጥፋ
    localStorage.clear();
    
    // 2. ወደ Login ገጽ እንዲመለስ አድርግ
    // window.location.href መጠቀም ከየትኛውም ፋይል ያሰራዋል
    window.location.href = '/login'; 
};