import frappe
from frappe import _


@frappe.whitelist()
def get_quotation():
    quotation_meta = frappe.get_meta("Quotation")
    users_data = getcustomer()
    
    filters = {"quotation_to": "Customer"}
    if users_data:
        filters["party_name"] = ["in", users_data]

    quotations = frappe.get_all("Quotation", fields=["*"], filters=filters)

    for quotation in quotations:
        quotation["items"] = frappe.get_all("Quotation Item", fields=["*"], filters={"parent": quotation["name"]})
        quotation["taxes"] = frappe.get_all("Sales Taxes and Charges", fields=["*"], filters={"parent": quotation["name"]})
        
        currency = quotation.get("currency")

        for field in quotation_meta.fields:
            if field.fieldtype == "Currency" and quotation.get(field.fieldname):
                quotation[field.fieldname] = frappe.utils.fmt_money(quotation[field.fieldname], currency=currency)
            # if field.fieldtype == "Date" and quotation.get(field.fieldname):
            #     quotation[field.fieldname] = frappe.utils.formatdate(quotation[field.fieldname], "dd-MM-yyyy")
        
        for item in quotation["items"]:
            item_meta = frappe.get_meta("Quotation Item")
            for field in item_meta.fields:
                if field.fieldtype == "Currency" and item.get(field.fieldname):
                    item[field.fieldname] = frappe.utils.fmt_money(item[field.fieldname], currency=currency)

        for tax in quotation["taxes"]:
            tax_meta = frappe.get_meta("Sales Taxes and Charges")
            for field in tax_meta.fields:
                if field.fieldtype == "Currency" and tax.get(field.fieldname):
                    tax[field.fieldname] = frappe.utils.fmt_money(tax[field.fieldname], currency=currency)

        if quotation.get("customer_address"):
            address = frappe.get_doc("Address", quotation["customer_address"])
            for field in ["address_line1", "address_line2", "city", "state", "country", "phone", "pincode"]:
                quotation[field] = getattr(address, field, None)

        if quotation.get("shipping_address_name"):
            ship_address = frappe.get_doc("Address", quotation["shipping_address_name"])
            for field in ["address_line1", "address_line2", "city", "state", "country", "phone", "pincode"]:
                quotation[f"ship_{field}"] = getattr(ship_address, field, None)

    return {
        "meta": quotation_meta.as_dict(),
        "data": quotations
    }


@frappe.whitelist()
def get_salesorder():
    salesorder_meta = frappe.get_meta("Sales Order")
    users_data = getcustomer()
    
    filters = {}
    if users_data:
        filters = {'customer': ['in', users_data]}

    salesorders = frappe.get_all("Sales Order", fields=['*'], filters=filters)

    for salesorder in salesorders:
        currency = salesorder.get("currency")

        for field in salesorder_meta.fields:
            if field.fieldtype == "Currency" and salesorder.get(field.fieldname):
                salesorder[field.fieldname] = frappe.utils.fmt_money(salesorder[field.fieldname], currency=currency)
            # if field.fieldtype == "Date" and salesorder.get(field.fieldname):
            #     salesorder[field.fieldname] = frappe.utils.formatdate(salesorder[field.fieldname], "dd-MM-yyyy")

        salesorder["items"] = frappe.get_all("Sales Order Item", fields=["*"], filters={"parent": salesorder["name"]})
        salesorder["taxes"] = frappe.get_all("Sales Taxes and Charges", fields=["*"], filters={"parent": salesorder["name"]})

        for item in salesorder["items"]:
            for field in frappe.get_meta("Sales Order Item").fields:
                if field.fieldtype == "Currency" and item.get(field.fieldname):
                    item[field.fieldname] = frappe.utils.fmt_money(item[field.fieldname], currency=currency)

        for tax in salesorder["taxes"]:
            for field in frappe.get_meta("Sales Taxes and Charges").fields:
                if field.fieldtype == "Currency" and tax.get(field.fieldname):
                    tax[field.fieldname] = frappe.utils.fmt_money(tax[field.fieldname], currency=currency)

        if salesorder.get('customer_address'):
            address = frappe.get_doc('Address', salesorder['customer_address'])
            for field in ["address_line1", "address_line2", "city", "state", "country", "phone", "pincode"]:
                salesorder[field] = getattr(address, field, None)

    return {
        "meta": salesorder_meta.as_dict(),
        "data": salesorders
    }


@frappe.whitelist()
def get_salesinvoice():
    salesinvoice_meta = frappe.get_meta("Sales Invoice")
    user_data = getcustomer()
    
    filters = {}
    if user_data:
        filters = {'customer': ['in', user_data]}

    salesinvoices = frappe.get_all("Sales Invoice", fields=['*'], filters=filters)

    for salesinvoice in salesinvoices:
        currency = salesinvoice.get("currency")

        for field in salesinvoice_meta.fields:
            if field.fieldtype == "Currency" and salesinvoice.get(field.fieldname):
                salesinvoice[field.fieldname] = frappe.utils.fmt_money(salesinvoice[field.fieldname], currency=currency)
            # if field.fieldtype == "Date" and salesinvoice.get(field.fieldname):
            #     salesinvoice[field.fieldname] = frappe.utils.formatdate(salesinvoice[field.fieldname], "dd-MM-yyyy")

        salesinvoice["items"] = frappe.get_all("Sales Invoice Item", fields=["*"], filters={"parent": salesinvoice["name"]})
        salesinvoice["taxes"] = frappe.get_all("Sales Taxes and Charges", fields=["*"], filters={"parent": salesinvoice["name"]})

        for item in salesinvoice["items"]:
            for field in frappe.get_meta("Sales Invoice Item").fields:
                if field.fieldtype == "Currency" and item.get(field.fieldname):
                    item[field.fieldname] = frappe.utils.fmt_money(item[field.fieldname], currency=currency)

        for tax in salesinvoice["taxes"]:
            for field in frappe.get_meta("Sales Taxes and Charges").fields:
                if field.fieldtype == "Currency" and tax.get(field.fieldname):
                    tax[field.fieldname] = frappe.utils.fmt_money(tax[field.fieldname], currency=currency)

        if salesinvoice.get('customer_address'):
            address = frappe.get_doc('Address', salesinvoice['customer_address'])
            for field in ["address_line1", "address_line2", "city", "state", "country", "phone", "pincode"]:
                salesinvoice[field] = getattr(address, field, None)

    return {
        "meta": salesinvoice_meta.as_dict(),
        "data": salesinvoices
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
        "meta": issue_meta.as_dict(),       
      
    }


@frappe.whitelist()
def get_shipments():
    users_data = getcustomer()
    filters = {}

    if users_data:
        filters = {'customer': ['in', users_data]}

    deliverynote_meta = frappe.get_meta("Delivery Note")
    deliverynotes = frappe.get_all("Delivery Note", fields=['*'], filters=filters)

    deliverynote_docs = []

    for delivery in deliverynotes:
        delivery_items = frappe.get_all("Delivery Note Item", fields=["*"], filters={"parent": delivery["name"]})
        delivery_taxes = frappe.get_all("Sales Taxes and Charges", fields=["*"], filters={"parent": delivery["name"]})

        currency = delivery.get("currency")

        for field in deliverynote_meta.fields:
            if field.fieldtype == "Currency" and delivery.get(field.fieldname):
                delivery[field.fieldname] = frappe.utils.fmt_money(delivery[field.fieldname], currency=currency)
            # elif field.fieldtype == "Date" and delivery.get(field.fieldname):
            #     delivery[field.fieldname] = frappe.utils.formatdate(delivery[field.fieldname], "dd-MM-yyyy")

     
        for item in delivery_items:
            for field in frappe.get_meta("Delivery Note Item").fields:
                if field.fieldtype == "Currency" and item.get(field.fieldname):
                    item[field.fieldname] = frappe.utils.fmt_money(item[field.fieldname], currency=currency)

        
        for tax in delivery_taxes:
            for field in frappe.get_meta("Sales Taxes and Charges").fields:
                if field.fieldtype == "Currency" and tax.get(field.fieldname):
                    tax[field.fieldname] = frappe.utils.fmt_money(tax[field.fieldname], currency=currency)
        
        if delivery.get('customer_address'):
            address = frappe.get_doc('Address', delivery['customer_address'])
            for field in ["address_line1", "address_line2", "city", "state", "country", "phone", "pincode"]:
                delivery[field] = getattr(address, field, None)

        delivery['items'] = delivery_items
        delivery['taxes'] = delivery_taxes
        deliverynote_docs.append(delivery)

    return {
        "meta": deliverynote_meta.as_dict(),
        "data": deliverynote_docs
    }

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
        "meta": address_meta.as_dict(),       
    }

@frappe.whitelist()
def get_projects():
    projects_meta = frappe.get_meta("Project")
    users_data = getcustomer()
    filters = {}
    if users_data:
        filters = {'customer': ['in', users_data]}
    projects = frappe.get_all("Project", fields=["*"], filters=filters)

    for project in projects:
        company = project.get("company")
        default_currency = None
        if company:
            default_currency = frappe.db.get_value("Company", company, "default_currency")

        # Format currency fields in Project
        for field in projects_meta.fields:
            if field.fieldtype == "Currency" and project.get(field.fieldname):
                project[field.fieldname] = frappe.utils.fmt_money(
                    project[field.fieldname],
                    currency=default_currency or frappe.defaults.get_global_default("currency")
                )
        
        # Get all tasks related to the current project
        project_name = project.get("name")
        if project_name:
            tasks = frappe.get_all("Task",fields=["*"],filters={"project": project_name})
            project["tasks"] = tasks

    return {
        "meta": projects_meta.as_dict(),
        "data": projects
    }

    




