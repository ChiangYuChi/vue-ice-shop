// Vue 原生

import Vue from 'vue';
import VueRouter from 'vue-router';

// Backstage
import BackDashboard from '@/components/backend/back_dashboard';
import Login from '@/components/backend/backend_pages/login';
import BackProducts from '@/components/backend/backend_pages/back_products';
import BackCustomerOrder from '@/components/backend/backend_pages/back_customer_order';
import BackCustomerCheckout from '@/components/backend/backend_pages/back_customer_checkout';
import BackCoupon from '@/components/backend/backend_pages/back_coupon';
import BackOrderManagement from '@/components/backend/backend_pages/back_order_management';

// Customer
import CustomerDashboard from '@/components/customer/customer_dashboard.vue';
import CustomerProducts from '@/components/customer/customer_pages/customer_products.vue';
import CustomerCart from '@/components/customer/customer_pages/customer_cart.vue';
import CustomerIndex from '@/components/customer/customer_pages/customer_index.vue';
import CustomerOrder from '@/components/customer/customer_pages/customer_order.vue';
import CustomerCoupon from '@/components/customer/customer_pages/customer_coupon.vue';
import CustomerPayment from '@/components/customer/customer_pages/customer_payment.vue';

Vue.use(VueRouter);

export default new VueRouter({
  routes: [{
      path: '*',
      redirect: 'login',
    },
    {
      path: '/login',
      name: 'Login',
      component: Login,
    }, {
      path: '/admin',
      component: BackDashboard,
      children: [{
        path: 'backproducts',
        name: 'back_products',
        component: BackProducts,
        meta: {
          requiresAuth: true
        },
      }, {
        path: 'backcoupon',
        name: 'back_coupon',
        component: BackCoupon,
        meta: {
          requiresAuth: true
        },

      }, {
        path: 'backordermanagement',
        name: 'back_order_management',
        component: BackOrderManagement,
        meta: {
          requiresAuth: true
        },

      }]

    }, {
      path: '/backorder',
      name: 'BackDashboard',
      component: BackDashboard,
      children: [{
        path: 'back_customer_order',
        name: 'back_customer_order',
        component: BackCustomerOrder,

      }, {
        path: 'back_customer_checkout/:orderId',
        name: 'back_customer_checkout',
        component: BackCustomerCheckout,

      }],
    }, {
      path: '/',
      component: CustomerDashboard,
      children: [{
          path: '/',
          name: 'customer_index',
          component: CustomerIndex
        },
        {
          path: 'customerproducts/:productId',
          name: 'customer_products',
          component: CustomerProducts
        }, {
          path: 'customercart',
          name: 'customer_cart',
          component: CustomerCart
        }, {
          path: 'customercoupon',
          name: 'customer_coupon',
          component: CustomerCoupon
        }, {
          path: 'customerorder',
          name: 'customer_order',
          component: CustomerOrder
        },
        {
          path: 'customerpayment/:orderId',
          name: 'customer_payment',
          component: CustomerPayment
        }

      ]
    }
  ]


});
