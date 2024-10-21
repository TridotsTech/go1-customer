import frappe
from frappe import _

@frappe.whitelist()
def customer_login():
    user = frappe.session.user
    result = frappe.db.get_all('Portal User', fields=['parent'], filters={"user": user})
    frappe.log_error('result', result)
    if result:
        return result[0].parent
    else:
        return 

#number-cards
@frappe.whitelist()
def outstanding_invoices():
    customer = customer_login()
    if customer:
        filters = {'docstatus': 1, 'customer':customer}
    else:
        filters = {'docstatus': 1}

    invoices = frappe.get_all('Sales Invoice', filters=filters, fields=['grand_total', 'outstanding_amount'])
    
    total_outstanding = sum(invoice.outstanding_amount for invoice in invoices)
    return {
        "total_outstanding": total_outstanding,
        "invoice_count": len(invoices),
        "message": "No outstanding invoices." if not invoices else ""
    }

@frappe.whitelist()
def average_order_value():
    customer = customer_login()
    if customer:
        filters = {'status': 'Completed', 'customer': customer}
    else:
        filters = {'status': 'Completed'}

    completed_orders = frappe.get_all('Sales Order', filters=filters, fields=['total'])

    if not completed_orders:
        return {"average_order_value": 0, "message": "No completed orders."}

    total_value = sum(order.total for order in completed_orders)
    avg_order_value = total_value / len(completed_orders)

    return avg_order_value

@frappe.whitelist()
def open_issues():
    customer = customer_login()
    if customer:
        filters = {'status': 'Open', 'customer': customer}
    else:
        filters = {'status': 'Open'}

    open_issues = frappe.get_all('Issue', filters=filters, fields=['name'])
    return {'open_issues_count': len(open_issues)}

@frappe.whitelist()
def open_orders():
    customer = customer_login()
    if customer:
        filters = {'status': ['in', ['To Bill', 'To Deliver and Bill', 'Overdue']], 'customer': customer}
    else:
        filters = {'status': ['in', ['To Bill', 'To Deliver and Bill', 'Overdue']]}

    open_orders = frappe.get_all('Sales Order', filters=filters, fields=['name'])
    return {'open_orders_count': len(open_orders)}

#charts
@frappe.whitelist()
def frequently_purchased_products():
    customer = customer_login()
    if customer:
        filters = {'status': 'Completed', 'customer': customer}
    else:
        filters = {'status': 'Completed'}

    sales_orders = frappe.get_all('Sales Order', filters=filters, fields=['name'])
    product_data = {}

    for order in sales_orders:
        items = frappe.get_all('Sales Order Item', filters={'parent': order.name}, fields=['item_name', 'qty'])

        for item in items:
            if item.item_name in product_data:
                product_data[item.item_name] += item.qty
            else:
                product_data[item.item_name] = item.qty

    sorted_product_data = sorted(product_data.items(), key=lambda x: x[1], reverse=True)[:5]

    return [{"item_name": item_name, "purchase_count": purchase_count} for item_name, purchase_count in sorted_product_data]

@frappe.whitelist()
def month_wise_spending():
    customer = customer_login()
    if customer:
        filters = {'status': 'Completed', 'customer': customer}
    else:
        filters = {'status': 'Completed'}

    invoices = frappe.get_all('Sales Order', filters=filters, fields=['transaction_date', 'grand_total'])

    if not invoices:
        return []

    spending_by_month = {}

    for invoice in invoices:
        if invoice.transaction_date:
            month_year = invoice.transaction_date.strftime('%Y-%m')
            spending_by_month[month_year] = spending_by_month.get(month_year, 0) + invoice.grand_total

    min_year = min(invoice.transaction_date.year for invoice in invoices)
    max_year = max(invoice.transaction_date.year for invoice in invoices)

    result = []
    for year in range(min_year, max_year + 1):
        for month in range(1, 13):
            month_key = f"{year}-{month:02d}"
            result.append({
                'month': month_key,
                'total_spending': spending_by_month.get(month_key, 0)
            })

    return result

@frappe.whitelist()
def spending_by_product_category():
    customer = customer_login()
    if customer:
        filters = {'status': 'Completed', 'customer': customer}
    else:
        filters = {'status': 'Completed'}

    sales_orders = frappe.get_all('Sales Order', filters=filters, fields=['name'])
    product_spending = {}

    for order in sales_orders:
        items = frappe.get_all('Sales Order Item', filters={'parent': order.name}, fields=['item_code', 'qty', 'rate'])

        for item in items:
            spending = item.qty * item.rate
            item_group = frappe.get_value('Item', item.item_code, 'item_group')

            if item_group:
                product_spending[item_group] = product_spending.get(item_group, 0) + spending

    return [{"category": category, "total_spending": total_spending} for category, total_spending in product_spending.items()]

@frappe.whitelist()
def sales_order_data():
    customer = customer_login()
    if customer:
        filters = {'status': ['in', ['To Deliver', 'To Bill', 'Completed']], 'customer': customer}
    else:
        filters = {'status': ['in', ['To Deliver', 'To Bill', 'Completed']]}

    sales_orders = frappe.get_all('Sales Order', filters=filters, fields=['status'])
    return {'message': sales_orders or "No sales orders found."}

