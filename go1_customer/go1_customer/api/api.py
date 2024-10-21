import frappe
from frappe import _


@frappe.whitelist()
def get_quotation():
    users_data = getcustomer()
    user_name = getcustomer()
    filters = {'quotation_to': ['in', 'Customer']}
    
    if users_data:
        filters = {'party_name': ['in', users_data]}

    quotations = frappe.db.get_all("Quotation", fields=['*'], filters=filters)
    quotation_docs = []

    # Get the meta data of the Quotation Doctype
    quotation_meta = frappe.get_meta("Quotation")

    for quotation in quotations:
        items = frappe.db.get_all("Quotation Item", fields=["*"], filters={"parent": quotation["name"]})
        taxes = frappe.db.get_all("Sales Taxes and Charges", fields=["*"], filters={"parent": quotation["name"]})

        quotation["items"] = items
        quotation["taxes"] = taxes

        quotation['grand_total'] = frappe.utils.fmt_money(quotation.get('grand_total'), currency=quotation.get('currency'))
        quotation['total'] = frappe.utils.fmt_money(quotation.get('total'), currency=quotation.get('currency'))
        quotation['rounded_total'] = frappe.utils.fmt_money(quotation.get('rounded_total'), currency=quotation.get('currency'))
        quotation['total_taxes_and_charges'] = frappe.utils.fmt_money(quotation.get('total_taxes_and_charges'), currency=quotation.get('currency'))

        quotation['transaction_date'] = frappe.utils.formatdate(quotation.get('transaction_date'), "dd-MM-yyyy")
        quotation['valid_till'] = frappe.utils.formatdate(quotation.get('valid_till'), "dd-MM-yyyy")

        for item in quotation['items']:
            item['rate'] = frappe.utils.fmt_money(item['rate'], currency=quotation.get('currency'))
            item['amount'] = frappe.utils.fmt_money(item['amount'], currency=quotation.get('currency'))

        for tax in quotation['taxes']:
            tax['rate'] = frappe.utils.fmt_money(tax.get('rate', 0), currency=quotation.get('currency'))
            tax['tax_amount'] = frappe.utils.fmt_money(tax.get('tax_amount', 0), currency=quotation.get('currency'))
            tax['total'] = frappe.utils.fmt_money(tax.get('total', 0), currency=quotation.get('currency'))

        if quotation.get('customer_address'):
            address = frappe.get_doc('Address', quotation['customer_address'])
            quotation['address_line1'] = address.address_line1
            quotation['address_line2'] = address.address_line2
            quotation['city'] = address.city
            quotation['country'] = address.country
            quotation['state'] = address.state
            quotation['phone_no'] = address.phone
            quotation['pincode'] = address.pincode
            quotation['user_name'] = user_name

        if quotation.get('shipping_address_name'):
            address = frappe.get_doc('Address', quotation['shipping_address_name'])
            quotation['ship_address_line1'] = address.address_line1
            quotation['ship_address_line2'] = address.address_line2
            quotation['ship_city'] = address.city
            quotation['ship_country'] = address.country
            quotation['ship_state'] = address.state
            quotation['ship_phone'] = address.phone
            quotation['ship_pincode'] = address.pincode
            quotation['ship_user_name'] = user_name      
        

        quotation_docs.append(quotation)

    return {
        "data": quotation_docs,
        "meta": {
            "fields": [
                {"label": field.label, "fieldname": field.fieldname, "fieldtype": field.fieldtype, "in_list_view": field.in_list_view}
                for field in quotation_meta.fields
            ]
        }
    }




@frappe.whitelist()
def get_salesorder():
    users_data = getcustomer()
    filters = {}

    if users_data:
        filters = {'customer': ['in', users_data]}

    salesorders = frappe.db.get_all("Sales Order", fields=['*'], filters=filters)
    salesorder_items = frappe.db.get_all("Sales Order Item", fields=["*"])
    salesorder_taxes = frappe.db.get_all("Sales Taxes and Charges", fields=["*"])

    salesorder_docs = []
    salesorder_meta = frappe.get_meta("Sales Order")

    for salesorder in salesorders:
        items = [item for item in salesorder_items if item["parent"] == salesorder["name"]]
        taxes = [tax_item for tax_item in salesorder_taxes if tax_item["parent"] == salesorder["name"]]

        salesorder["items"] = items
        salesorder["taxes"] = taxes
        salesorder_docs.append(salesorder)

    for sales in salesorder_docs:
        sales['grand_total'] = frappe.utils.fmt_money(sales.get('grand_total'), currency=sales.get('currency'))
        sales['total'] = frappe.utils.fmt_money(sales.get('total'), currency=sales.get('currency'))
        sales['transaction_date'] = frappe.utils.formatdate(sales.get('transaction_date'), "dd-MM-yyyy")
        sales['delivery_date'] = frappe.utils.formatdate(sales.get('delivery_date'), "dd-MM-yyyy")
        sales['rounded_total'] = frappe.utils.fmt_money(sales.get('rounded_total'), currency=sales.get('currency'))
        sales['total_taxes_and_charges'] = frappe.utils.fmt_money(sales.get('total_taxes_and_charges'), currency=sales.get('currency'))

        for item in sales['items']:
            item['rate'] = frappe.utils.fmt_money(item['rate'], currency=sales.get('currency'))
            item['amount'] = frappe.utils.fmt_money(item['amount'], currency=sales.get('currency'))

        for tax in sales['taxes']:
            tax['rate'] = frappe.utils.fmt_money(tax.get('rate', 0), currency=sales.get('currency'))
            tax['tax_amount'] = frappe.utils.fmt_money(tax.get('tax_amount', 0), currency=sales.get('currency'))
            tax['total'] = frappe.utils.fmt_money(tax.get('total', 0), currency=sales.get('currency'))

        if sales.get('customer_address'):
            address = frappe.get_doc('Address', sales['customer_address'])
            sales['address_line1'] = address.address_line1
            sales['address_line2'] = address.address_line2
            sales['city'] = address.city
            sales['country'] = address.country
            sales['state'] = address.state
            sales['phone'] = address.phone
            sales['pincode'] = address.pincode

    return {
        "data": salesorder_docs,
        "meta": {
            "fields": [
                {"label": field.label, "fieldname": field.fieldname, "fieldtype": field.fieldtype, "in_list_view": field.in_list_view}
                for field in salesorder_meta.fields
            ]
        }
    }



@frappe.whitelist()
def get_salesinvoice():
    user_data = getcustomer()
    filters = {}
    
    if user_data:
        filters = {'customer': ['in', user_data]}

    salesinvoices = frappe.db.get_all("Sales Invoice", fields=['*'], filters=filters)
    salesinvoice_items = frappe.db.get_all("Sales Invoice Item", fields=["*"])
    salesinvoice_taxes = frappe.db.get_all("Sales Taxes and Charges", fields=["*"])

    salesinvoices_docs = []
    salesinvoices_meta = frappe.get_meta("Sales Invoice")

    for salesinvoice in salesinvoices:
        items = [item for item in salesinvoice_items if item["parent"] == salesinvoice["name"]]
        taxes = [tax_item for tax_item in salesinvoice_taxes if tax_item["parent"] == salesinvoice["name"]]

        salesinvoice["items"] = items
        salesinvoice["taxes"] = taxes
        salesinvoices_docs.append(salesinvoice)

    for sales in salesinvoices_docs:
        sales['grand_total'] = frappe.utils.fmt_money(sales.get('grand_total'), currency=sales.get('currency'))
        sales['total'] = frappe.utils.fmt_money(sales.get('total'), currency=sales.get('currency'))
        sales['rounded_total'] = frappe.utils.fmt_money(sales.get('rounded_total'), currency=sales.get('currency'))
        sales['total_taxes_and_charges'] = frappe.utils.fmt_money(sales.get('total_taxes_and_charges'), currency=sales.get('currency'))
        sales['posting_date'] = frappe.utils.formatdate(sales.get('posting_date'), "dd-MM-yyyy")
        sales['due_date'] = frappe.utils.formatdate(sales.get('due_date'), "dd-MM-yyyy")

        for item in sales['items']:
            item['rate'] = frappe.utils.fmt_money(item['rate'], currency=sales.get('currency'))
            item['amount'] = frappe.utils.fmt_money(item['amount'], currency=sales.get('currency'))

        for tax in sales['taxes']:
            tax['rate'] = frappe.utils.fmt_money(tax.get('rate', 0), currency=sales.get('currency'))
            tax['tax_amount'] = frappe.utils.fmt_money(tax.get('tax_amount', 0), currency=sales.get('currency'))
            tax['total'] = frappe.utils.fmt_money(tax.get('total', 0), currency=sales.get('currency'))

        if sales.get('customer_address'):
            address = frappe.get_doc('Address', sales['customer_address'])
            sales['address_line1'] = address.address_line1
            sales['address_line2'] = address.address_line2
            sales['city'] = address.city
            sales['country'] = address.country
            sales['state'] = address.state
            sales['phone_no'] = address.phone
            sales['pincode'] = address.pincode

    return {
        "data": salesinvoices_docs,
        "meta": {
            "fields": [
                {"label": field.label, "fieldname": field.fieldname, "fieldtype": field.fieldtype, "in_list_view": field.in_list_view}
                for field in salesinvoices_meta.fields
            ]
        }
    }



@frappe.whitelist()
def get_issues():
    user_data = getcustomer()
    filters = {}
    if user_data:
        filters = {'customer': ['in', user_data]}    
    issues = frappe.db.get_all("Issue", fields=['*'], filters=filters)    
    issue_meta = frappe.get_meta("Issue")  
    return {
        "data": issues,
        "meta": {
            "fields": [
                {"label": field.label, "fieldname": field.fieldname, "fieldtype": field.fieldtype, "in_list_view": field.in_list_view}
                for field in issue_meta.fields
            ]
        }
    }


@frappe.whitelist()
def get_shipments():
    users_data = getcustomer()
    filters = {}

    if users_data:
        filters = {'customer': ['in', users_data]}

    deliverynote = frappe.db.get_all("Delivery Note", fields=['*'], filters=filters)
    deliverynote_items = frappe.db.get_all("Delivery Note Item", fields=["*"])
    deliverynote_taxes = frappe.db.get_all("Sales Taxes and Charges", fields=["*"])

    deliverynote_docs = []
    deliverynote_meta = frappe.get_meta("Delivery Note")

    for dn in deliverynote:
        items = [item for item in deliverynote_items if item["parent"] == dn["name"]]
        taxes = [tax_item for tax_item in deliverynote_taxes if tax_item["parent"] == dn["name"]]

        dn["items"] = items
        dn["taxes"] = taxes
        deliverynote_docs.append(dn)

    for delivery in deliverynote_docs:
        delivery['grand_total'] = frappe.utils.fmt_money(delivery.get('grand_total'), currency=delivery.get('currency'))
        delivery['posting_date'] = frappe.utils.formatdate(delivery.get('posting_date'), "dd-MM-yyyy")
        delivery['total'] = frappe.utils.fmt_money(delivery.get('total'), currency=delivery.get('currency'))
        delivery['rounded_total'] = frappe.utils.fmt_money(delivery.get('rounded_total'), currency=delivery.get('currency'))
        delivery['total_taxes_and_charges'] = frappe.utils.fmt_money(delivery.get('total_taxes_and_charges'), currency=delivery.get('currency'))

        for item in delivery['items']:
            item['rate'] = frappe.utils.fmt_money(item['rate'], currency=delivery.get('currency'))
            item['amount'] = frappe.utils.fmt_money(item['amount'], currency=delivery.get('currency'))

        for tax in delivery['taxes']:
            tax['rate'] = frappe.utils.fmt_money(tax.get('rate', 0), currency=delivery.get('currency'))
            tax['tax_amount'] = frappe.utils.fmt_money(tax.get('tax_amount', 0), currency=delivery.get('currency'))
            tax['total'] = frappe.utils.fmt_money(tax.get('total', 0), currency=delivery.get('currency'))

        if delivery.get('customer_address'):
            address = frappe.get_doc('Address', delivery['customer_address'])
            delivery['address_line1'] = address.address_line1
            delivery['address_line2'] = address.address_line2
            delivery['city'] = address.city
            delivery['country'] = address.country
            delivery['state'] = address.state
            delivery['phone_no'] = address.phone
            delivery['pincode'] = address.pincode

    return {
        "data": deliverynote_docs,
        "meta": {
            "fields": [
                {"label": field.label, "fieldname": field.fieldname, "fieldtype": field.fieldtype, "in_list_view": field.in_list_view}
                for field in deliverynote_meta.fields
            ]
        }
    }


@frappe.whitelist()
def get_material_request():
    materialreq = frappe.db.get_all("Material Request", fields=['*'])
    materialreq_items = frappe.db.get_all("Material Request Item", fields=["*"])
    materialreq_docs = []
    for mr in materialreq:
        items = []
        for item in materialreq_items:
            if item["parent"] == mr["name"]:
                items.append(item)
        mr["items"] = items
        materialreq_docs.append(mr)
    for material in materialreq_docs:
       material['grand_total'] = frappe.utils.fmt_money(material.get('grand_total'), currency=material.get('currency'))    
       material['transaction_date'] = frappe.utils.formatdate(material.get('transaction_date'), "dd-MM-yyyy")
       material['schedule_date'] = frappe.utils.formatdate(material.get('schedule_date'), "dd-MM-yyyy")    
       for item in material['items']:
            item['rate'] = frappe.utils.fmt_money(item['rate'], currency=material.get('currency'))
            item['amount'] = frappe.utils.fmt_money(item['amount'], currency=material.get('currency'))
    return materialreq_docs

@frappe.whitelist()
def get_username():
   current_user=frappe.session.user
   user_detail = frappe.get_all("User", filters={'name': current_user}, fields=['full_name'])
   return user_detail[0].full_name



@frappe.whitelist()
def get_logged_user():
    user_details = frappe.get_all("User", filters={'name': frappe.session.user}, fields=['full_name'])
    return user_details[0].full_name

@frappe.whitelist()
def get_navbar_routes():
    check=frappe.get_single('Go1 Navbar Settings')
    user_details = frappe.get_all("Go1 Navbar Item", filters={'parent': 'Go1 Navbar Settings','enabled':1}, fields=['*'])
    return user_details



@frappe.whitelist()
def get_userid():
    return frappe.session.user


@frappe.whitelist()
def getcustomer():
    user_check = get_userid()
    customers = frappe.db.get_all("Customer", fields=['name'])
    customer_portal_details = []
    customers_details = []

    for customer in customers:
        portal_users = frappe.db.get_all("Portal User", filters={'parent': customer['name']}, fields=['user'])
        for portal_user in portal_users:
            if portal_user['user'] == user_check :
                customer_portal_details.append({
                    'customer': customer,
                    'portal_users': portal_users
                })

    for detail in customer_portal_details:
        customers_details.append(detail['customer']['name'])

    return customers_details




@frappe.whitelist()
def get_address():
    users_data = getcustomer()
    address_list = []
    addresses = frappe.db.get_all("Address", fields=['*'])
    
    address_meta = frappe.get_meta("Address")  

    for address in addresses:
        links = frappe.db.get_all("Dynamic Link", fields=['*'], filters={'parent': address['name'], 'link_doctype': 'Customer'})
        address['links'] = links
        address_list.append(address)

    address_data = []
    for address in address_list:
        for link in address['links']:
            if link['link_name'] in users_data:
                address_data.append(address)
            else:
                address_data.append(address)

    return {
        "data": address_data,
        "meta": {
            "fields": [
                {"label": field.label, "fieldname": field.fieldname, "fieldtype": field.fieldtype, "in_list_view": field.in_list_view}
                for field in address_meta.fields
            ]
        }
    }


