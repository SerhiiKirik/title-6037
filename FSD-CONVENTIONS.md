FSD conventions

Naming
• kebab-case everywhere: папки, файли, компоненти в ui/ (наприклад: booking-panel, select-time, confirm-booking).
• 1 slice = 1 відповідальність / одна бізнес-ідея.
• Будь-які “публічні” імпорти робимо через index.ts (public API).

Layers (рівні)
• app/ — провайдери, глобальні стилі, layout, конфіг верхнього рівня.
• pages/ — сторінки (композиція widgets/features), мінімум логіки.
• widgets/ — великі UI-блоки сторінки (компонує features/entities/shared).
• features/ — користувацькі дії/сценарії (select date/time, confirm, etc).
• entities/ — доменні сутності + їх стан/логіка (store, selectors, domain helpers).
• shared/ — перевикористовувані UI компоненти, утиліти, хелпери, базові типи.

Slice structure (типова структура слайсу)
• ui/ — React компоненти слайсу (CSS Modules поруч).
• model/ — state/store, selectors, derived state.
• lib/ — чисті функції/утиліти, які належать слайсу.
• api/ — запити/адаптери (якщо потрібні).
• index.ts — єдина точка експорту назовні.

Public API rule
• Імпорти між слоями/слайсами — тільки через index.ts.
• ✅ import { BookingPanel } from '@/widgets/booking-panel'
• ❌ import { BookingPanel } from '@/widgets/booking-panel/ui/booking-panel'

Dependency direction
• Дозволений напрям залежностей:
• app → pages → widgets → features → entities → shared
• shared ні від кого не залежить (тільки від своїх підпапок).

UI conventions
• Компоненти в ui/ мають однакову структуру:
• Props interface
• деструктуризація props
• hooks зверху
• helper functions
• effects (якщо треба)
• return з layout
• Стилі: CSS Modules (\*.module.css) поруч із компонентом.

Where to put date/time logic
• “Чиста” логіка дат/слотів (генерація діапазону, 15-хв інтервали, округлення часу) — в entities/_/lib або shared/lib (залежно від загальності).
• Стан вибору (selected date/time, isConfirmEnabled) — в entities/_/model.
