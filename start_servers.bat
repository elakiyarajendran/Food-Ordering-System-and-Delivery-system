@echo off
echo =======================================================
echo          FOODYX - Luxury Food Ordering & Delivery
echo              Full Stack Web Application (v1.0)
echo =======================================================
echo.
echo Starting Django REST Framework Backend on port 8000...
start cmd /k "cd backend && python manage.py runserver 0.0.0.0:8000"

timeout /t 3 /nobreak >nul

echo Starting Vite React Frontend on port 5173...
start cmd /k "cd frontend && npm run dev"

echo.
echo =======================================================
echo App launched successfully!
echo Frontend: http://localhost:5173
echo Backend API: http://localhost:8000/api/
echo Admin Panel: http://localhost:8000/admin/
echo.
echo Demo Accounts:
echo - Customer: customer@foodyx.com / password123
echo - Restaurant Owner: owner@foodyx.com / password123
echo - Delivery Partner: delivery@foodyx.com / password123
echo - Administrator: admin@foodyx.com / password123
echo =======================================================
pause
